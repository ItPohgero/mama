import fs from "node:fs/promises";
import path from "node:path";
import { useMake } from "@/hooks/use_make";
import type { HttpMethod } from "@/template/next/create/src/types/route.types";
import { CapitalizeFirstLetter } from "@/utils/capitalize";
import inquirer from "inquirer";

const TEMPLATE_QUERY = path.join(
	__dirname,
	"../../../template/next/init/make/call_query.ejs.t",
);
const TEMPLATE_MUTATION = path.join(
	__dirname,
	"../../../template/next/init/make/call_mutation.ejs.t",
);
const TEMPLATE_CONTROLLER = path.join(
	__dirname,
	"../../../template/next/init/make/controller.ejs.t",
);

const REGISTRY_FILE_PATH = path.join(
	process.cwd(),
	"src/server/registry/routes.ts",
);

export const MakeCall = async () => {
	const { method, endpoint, name, groupName } = await inquirer.prompt([
		{
			type: "list",
			name: "method",
			message: "Select HTTP method:",
			choices: ["get", "post", "put", "delete", "patch"] as HttpMethod[],
		},
		{
			type: "input",
			name: "endpoint",
			message: "Enter the endpoint path:",
		},
		{
			type: "input",
			name: "name",
			message: "Enter controller name:",
		},
		{
			type: "input",
			name: "groupName",
			message: "Enter route group name (leave empty for standalone route):",
			default: "",
		},
	]);

	// Automatically determine template based on HTTP method
	const templatePath = method === "get" ? TEMPLATE_QUERY : TEMPLATE_MUTATION;

	// Create call file
	const run_call = useMake({
		configDirKey: "call",
		templatePath,
		fileStructure: {
			directoryPattern: undefined,
			filePattern: `call_${name}`,
			extension: ".ts",
		},
	});
	await run_call(name);

	// Create controller file
	const run_controller = useMake({
		configDirKey: "controller",
		templatePath: TEMPLATE_CONTROLLER,
		fileStructure: {
			directoryPattern: undefined,
			filePattern: `${name}.controller`,
			extension: ".ts",
		},
	});
	await run_controller(name);

	try {
		const registryContent = await fs.readFile(REGISTRY_FILE_PATH, "utf-8");
		const capitalizedName = CapitalizeFirstLetter(name);

		// Add import statement
		const importStatement = `import ${capitalizedName}Controller from "@/server/controllers/${name}.controller";`;

		// Create route definition
		const routeDefinition = `        {
        	path: "${endpoint}",
        	method: "${method}",
        	handler: ${capitalizedName}Controller
        }`;

		// Update registry file
		let updatedContent = registryContent;

		// Split the content into sections
		const [importSection, restContent] = registryContent.split(
			"export const appRoutes",
		);

		// Find the last controller import
		const importLines = importSection.split("\n");
		const typeImports = importLines.filter((line) =>
			line.includes("import type"),
		);
		const controllerImports = importLines.filter(
			(line) =>
				line.includes("import") &&
				!line.includes("import type") &&
				line.trim() !== "",
		);

		// Add new import to controller imports
		controllerImports.push(importStatement);

		// Sort controller imports alphabetically
		controllerImports.sort();

		// Reconstruct the import section
		const newImportSection = [
			...typeImports,
			"", // Empty line after type imports
			...controllerImports,
			"", // Empty line before appRoutes
		].join("\n");

		// Combine the new import section with the rest of the content
		updatedContent = `${newImportSection}export const appRoutes${restContent}`;

		// Add route to appropriate section
		if (groupName) {
			// Add to existing group or create new group
			if (registryContent.includes(`prefix: "/${groupName}"`)) {
				updatedContent = updatedContent.replace(
					new RegExp(`(prefix: "/${groupName}",[\\s\\S]*?routes: \\[)`),
					`$1\n${routeDefinition},`,
				);
			} else {
				updatedContent = updatedContent.replace(
					/groups: \[/,
					`groups: [\n    {\n      prefix: "/${groupName}",\n      routes: [\n${routeDefinition}\n      ]\n    },`,
				);
			}
		} else {
			// Add to standalone routes
			updatedContent = updatedContent.replace(
				/standalone: \[/,
				`standalone: [\n${routeDefinition},`,
			);
		}

		await fs.writeFile(REGISTRY_FILE_PATH, updatedContent, "utf-8");
		console.log(
			`✅ Successfully added ${method.toUpperCase()} ${endpoint} endpoint`,
		);
	} catch (error) {
		console.error("Failed to update routes registry:", error);
	}
};

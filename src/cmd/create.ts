import * as fs from "node:fs";
import * as path from "node:path";
import type { TypeOptions } from "@/configs/types";
import text from "@/lang/text";
import type {
	PackageJson,
	ProjectChoice,
	PromptResult,
	TemplateConfig,
} from "@/types/create.types";
import type { Command } from "commander";
import inquirer from "inquirer";

const TEMPLATES: Record<TypeOptions, TemplateConfig> = {
	next: {
		path: path.join(__dirname, "../template/next/create"),
		installCommand: "bun install",
		startCommand: "bun run dev",
	},
} as const;

// Helper function to copy directory recursively
const copyDir = (src: string, dest: string): void => {
	// Create destination directory if it doesn't exist
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	// Read source directory
	const entries = fs.readdirSync(src, { withFileTypes: true });

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			copyDir(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
};

const createProject = (TypeOptions: TypeOptions, name: string): void => {
	const template = TEMPLATES[TypeOptions];
	const projectPath = path.join(process.cwd(), name);

	if (!fs.existsSync(template.path)) {
		throw new Error(`Template directory not found: ${template.path}`);
	}

	// Create project directory
	if (!fs.existsSync(projectPath)) {
		fs.mkdirSync(projectPath, { recursive: true });
	}

	// Copy template files
	copyDir(template.path, projectPath);
};

const updatePackageJson = (projectPath: string, newName: string): void => {
	const packageJsonPath = path.join(projectPath, "package.json");

	if (!fs.existsSync(packageJsonPath)) {
		return;
	}

	try {
		const content = fs.readFileSync(packageJsonPath, "utf8");
		const packageJson = JSON.parse(content) as PackageJson;
		packageJson.name = newName;
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
	} catch (error) {
		if (error instanceof Error) {
			console.warn(`Warning: Could not update package.json: ${error.message}`);
		}
	}
};

const PROJECT_CHOICES: readonly ProjectChoice[] = [
	{
		name: "NextJs",
		value: "next",
	},
] as const;

export const Create = (program: Command): void => {
	program
		.command("create")
		.description(text.create.description)
		.argument("<name>", text.create.argument.name)
		.action(async (name: string) => {
			try {
				const { TypeOptions } = await inquirer.prompt<PromptResult>([
					{
						type: "list",
						name: "TypeOptions",
						message: "Select project boilerplate:",
						choices: PROJECT_CHOICES,
					},
				]);
				console.log(
					`🚀 Mama help to creating ${TypeOptions} application ${name}...`,
				);
				createProject(TypeOptions, name);
				process.chdir(name);
				if (TypeOptions.includes("next")) {
					updatePackageJson(process.cwd(), name);
				}
				const template = TEMPLATES[TypeOptions];
				console.log(`
✨ ${TypeOptions.toUpperCase()} Application ready!

To get started:
cd ${name}
${template.installCommand}
${template.startCommand}

Happy coding guys! 🎉
by: @mataramandev
        `);
			} catch (error) {
				if (error instanceof Error) {
					console.error("❌ Error creating application:", error.message);
				} else {
					console.error("❌ An unexpected error occurred");
				}
				process.exit(1);
			}
		});
};

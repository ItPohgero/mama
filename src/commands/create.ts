import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import type { Command } from "commander";
import inquirer from "inquirer";
import type { TypeOptions } from "../configs/type";
import { useWording } from "../hooks/use_wording";

interface TemplateConfig {
	readonly repo: string;
	readonly installCommand: string;
	readonly startCommand: string;
}

const TEMPLATES: Record<TypeOptions, TemplateConfig> = {
	next: {
		repo: "dev-mataraman/mama-nextjs",
		installCommand: "pnpm install",
		startCommand: "pnpm run dev",
	},
	next_fullstack: {
		repo: "dev-mataraman/mama-nextjs-fullstack",
		installCommand: "bun install",
		startCommand: "bun run dev",
	},
	flutter: {
		repo: "dev-mataraman/mama-flutter",
		installCommand: "flutter pub get",
		startCommand: "flutter run",
	},
	bun_hono: {
		repo: "dev-mataraman/mama-bun-hono",
		installCommand: "bun install",
		startCommand: "bun run dev",
	},
	golang: {
		repo: "dev-mataraman/mama-golang",
		installCommand: "go mod tidy",
		startCommand: "go run main.go",
	},
} as const;

// Define project choice interface
interface ProjectChoice {
	readonly name: string;
	readonly value: TypeOptions;
}

// Define prompt result type
interface PromptResult {
	readonly TypeOptions: TypeOptions;
}

// Define package.json interface
interface PackageJson {
	name: string;
	[key: string]: unknown;
}

// Helper functions with proper error handling
const checkDegit = async (): Promise<void> => {
	try {
		execSync("degit -v", { stdio: "ignore" });
	} catch {
		console.log("📦 Installing degit...");
		execSync("npm install -g degit", { stdio: "inherit" });
	}
};

const createProject = (TypeOptions: TypeOptions, name: string): void => {
	const template = TEMPLATES[TypeOptions];
	execSync(`degit ${template.repo} ${name}`, {
		stdio: "inherit",
	});
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
		name: "Frontend NextJs",
		value: "next",
	},
	{
		name: "Fullstack NextJs",
		value: "next_fullstack",
	},
	{
		name: "Mobile Flutter",
		value: "flutter",
	},
	{
		name: "Service (Bun + Hono)",
		value: "bun_hono",
	},
	{
		name: "Service (Golang)",
		value: "golang",
	},
] as const;

export const Create = (program: Command): void => {
	const word = useWording();

	program
		.command("create")
		.description(word.create.description)
		.argument("<name>", word.create.argument.name)
		.action(async (name: string) => {
			try {
				await checkDegit();
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

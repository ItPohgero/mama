import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import type { Command } from "commander";
import inquirer from "inquirer";

// Define template repositories
type ProjectType = "next" | "next-fullstack" | "flutter";

interface TemplateConfig {
	readonly repo: string;
	readonly installCommand: string;
	readonly startCommand: string;
}

const TEMPLATES: Record<ProjectType, TemplateConfig> = {
	next: {
		repo: "ItPohgero/next-architecture",
		installCommand: "pnpm install",
		startCommand: "pnpm run dev",
	},
	"next-fullstack": {
		repo: "ItPohgero/next-architecture#fullstack",
		installCommand: "pnpm install",
		startCommand: "pnpm run dev",
	},
	flutter: {
		repo: "ItPohgero/flutter-template",
		installCommand: "flutter pub get",
		startCommand: "flutter run",
	},
} as const;

// Define project choice interface
interface ProjectChoice {
	readonly name: string;
	readonly value: ProjectType;
}

// Define prompt result type
interface PromptResult {
	readonly projectType: ProjectType;
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

const createProject = (projectType: ProjectType, name: string): void => {
	const template = TEMPLATES[projectType];
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
		name: "Next.js (Basic)",
		value: "next",
	},
	{
		name: "Next.js Fullstack",
		value: "next-fullstack",
	},
	{
		name: "Flutter",
		value: "flutter",
	},
] as const;

export const Create = (program: Command): void => {
	program
		.command("create")
		.description("Create a new application")
		.argument("<name>", "Name of the application")
		.action(async (name: string) => {
			try {
				// Check for degit installation
				await checkDegit();

				// Get project type from user
				const { projectType } = await inquirer.prompt<PromptResult>([
					{
						type: "list",
						name: "projectType",
						message: "Select project boilerplate:",
						choices: PROJECT_CHOICES,
					},
				]);

				console.log(
					`🚀 Mama help to creating ${projectType} application ${name}...`,
				);

				// Create the project
				createProject(projectType, name);

				// Change directory
				process.chdir(name);

				// Update package.json for Next.js projects
				if (projectType.includes("next")) {
					updatePackageJson(process.cwd(), name);
				}

				// Get template config
				const template = TEMPLATES[projectType];

				console.log(`
✨ ${projectType.toUpperCase()} Application ready!

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

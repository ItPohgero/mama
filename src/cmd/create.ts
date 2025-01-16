import { execSync } from "node:child_process";
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
		repo: "dev-mataraman/mama-nextjs",
		installCommand: "pnpm install",
		startCommand: "pnpm run dev",
	},
} as const;

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
		name: "NextJs",
		value: "next",
	},
	// {
	// 	name: "Angular",
	// 	value: "angular",
	// },
] as const;

export const Create = (program: Command): void => {
	program
		.command("create")
		.description(text.create.description)
		.argument("<name>", text.create.argument.name)
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

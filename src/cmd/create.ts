import text from "@/lang/text";
import type { PromptResult } from "@/types/create.types";
import chalk from "chalk";
import type { Command } from "commander";
import inquirer from "inquirer";
import { PROJECT_CHOICES, TEMPLATES } from "./create/config";
import { createProject } from "./create/hooks/create-project";
import { updatePackageJson } from "./create/hooks/update-package-json";

export const Create = (program: Command): void => {
	program
		.command("create")
		.description(text.create.description)
		.argument("[name]", text.create.argument.name, "my-app")
		.action(async (name: string) => {
			try {
				const { TypeOptions } = await inquirer.prompt<PromptResult>([
					{
						type: "list",
						name: "TypeOptions",
						message: " Would you like to install a starter kit?",
						choices: PROJECT_CHOICES,
					},
				]);
				console.log(
					`🚀 Mama help to creating ${TypeOptions} application ${name}...`,
				);
				await createProject(TypeOptions, name);
				process.chdir(name);
				if (TypeOptions.includes("next")) {
					updatePackageJson(process.cwd(), name);
				}
				const template = TEMPLATES[TypeOptions];
				console.log(chalk.green("\n✓ Application created successfully!"));
				console.log("\nTo get started:");
				console.log(chalk.cyan(`cd ${name}`));
				console.log(chalk.cyan(template.installCommand));
				console.log(chalk.cyan(template.startCommand));
				console.log("\nHappy coding guys! 🎉");
				console.log(chalk.gray("author: @wahyuagusarifin"));
				console.log(chalk.gray("sponsored: @mataramandev\n"));
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
export { TEMPLATES };

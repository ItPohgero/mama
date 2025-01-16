import text from "@/lang/text";
import type { PromptResult } from "@/types/create.types";
import type { Command } from "commander";
import inquirer from "inquirer";
import { PROJECT_CHOICES, TEMPLATES } from "./create/config";
import { createProject } from "./create/hooks/create-project";
import { updatePackageJson } from "./create/hooks/update-package-json";

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
export { TEMPLATES };

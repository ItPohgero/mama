import fs from "node:fs";
import path from "node:path";
import { env } from "@/configs/environtment";

import { useReadConfig } from "@/hooks/use_config_files";
import { useHandleFileExists } from "@/hooks/use_file_exist";
import { ProcessName } from "@/utils/capitalize";
import handleError from "@/utils/hadle-error";
import chalk from "chalk";
import ejs from "ejs";
import inquirer from "inquirer";
import { COMPONENTS, TEMPLATE_FILE } from "./config.gen:components";

export const GenComponents = async (): Promise<void> => {
	try {
		// Read configuration
		const config = useReadConfig(env.configFile);
		const screenDir = config?.dir?.component;

		if (!screenDir) {
			throw new Error(
				"Screen directory not configured. Please check your config file.",
			);
		}

		const { name } = await inquirer.prompt([
			{
				type: "list",
				name: "name",
				message: "Select component:",
				choices: COMPONENTS,
			},
		]);

		const templateEntry = TEMPLATE_FILE.find((item) => item.key === name);
		if (!templateEntry) {
			throw new Error(`Template for component "${name}" not found.`);
		}

		if (!fs.existsSync(templateEntry.value)) {
			throw new Error(`Template file not found at: ${templateEntry.value}`);
		}

		const processedName = ProcessName(name);
		const fileType = ".tsx";
		const targetDir = path.resolve(screenDir);
		const targetFile = path.join(targetDir, `${processedName}${fileType}`);

		// Check for existing file and handle overwrite
		const shouldProceed = await useHandleFileExists(targetFile);
		if (!shouldProceed) {
			return;
		}

		// Create directory structure if it doesn't exist
		await fs.promises.mkdir(targetDir, { recursive: true });

		console.log(
			chalk.blue(`Creating file ${chalk.yellow(processedName + fileType)}...`),
		);

		// Read and render template
		const templateContent = await fs.promises.readFile(
			templateEntry.value,
			"utf8",
		);
		const renderedContent = ejs.render(templateContent, {
			name: processedName,
			createdAt: new Date().toISOString(),
			author: env.name || "unknown",
		});

		// Write file
		await fs.promises.writeFile(targetFile, renderedContent, "utf8");
		console.log(
			chalk.green(
				`✓ File successfully created at: ${chalk.yellow(targetFile)}`,
			),
		);
	} catch (error) {
		handleError(error);
	}
};

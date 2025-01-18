import fs from "node:fs";
import path from "node:path";
import { env } from "@/configs/environtment";
import { useReadConfig } from "@/hooks/use_config_files";
import { useHandleFileExists } from "@/hooks/use_file_exist";
import { ProcessName } from "@/utils/capitalize";
import handleError from "@/utils/hadle-error";
import { validCannotBeEmpty } from "@/utils/valid-cannot-be-empty";
import chalk from "chalk";
import ejs from "ejs";
import inquirer from "inquirer";

interface MakerConfig {
	configDirKey: string; // The key to look up in config.dir (e.g., 'screen', 'api', 'hooks')
	templatePath: string; // Path to the template file
	filePrefix: string; // Prefix for the directory (e.g., 'screen_', 'api_')
	fileExtension: string; // File extension (e.g., '.tsx', '.ts')
	promptMessage?: string; // Custom prompt message
}

export const useMake = (config: MakerConfig) => {
	return async (name?: string): Promise<void> => {
		try {
			// Read configuration
			const appConfig = useReadConfig(env.configFile);
			const targetDir = appConfig?.dir?.[config.configDirKey];

			if (!targetDir) {
				throw new Error(
					`${config.configDirKey} directory not configured. Please check your config file.`,
				);
			}

			// Get name from parameter or prompt
			let itemName: string;
			if (name) {
				itemName = name;
			} else {
				const answer = await inquirer.prompt([
					{
						type: "input",
						name: "name",
						message: chalk.dim.gray(
							config.promptMessage || `Enter ${config.configDirKey} name:`,
						),
						validate: validCannotBeEmpty,
					},
				]);
				itemName = answer.name;
			}

			const processedName = ProcessName(itemName);
			const targetDirectory = path.resolve(
				targetDir,
				`${config.filePrefix}${processedName?.toLowerCase()}`,
			);
			const targetFile = path.join(
				targetDirectory,
				`main${config.fileExtension}`,
			);

			// Verify template exists
			if (!fs.existsSync(config.templatePath)) {
				throw new Error(`Template file not found at: ${config.templatePath}`);
			}

			// Check for existing file and handle overwrite
			const shouldProceed = await useHandleFileExists(targetFile);
			if (!shouldProceed) {
				return;
			}

			// Create directory structure
			await fs.promises.mkdir(targetDirectory, { recursive: true });

			console.log(
				chalk.blue(
					`Creating ${config.configDirKey} file ${chalk.yellow(
						processedName + config.fileExtension,
					)}...`,
				),
			);

			// Read and render template
			const templateContent = await fs.promises.readFile(
				config.templatePath,
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
					`✓ ${config.configDirKey} file successfully created at: ${chalk.yellow(
						targetFile,
					)}`,
				),
			);
		} catch (error) {
			handleError(error);
		}
	};
};

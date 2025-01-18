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

interface FileStructure {
	directoryPattern?: string;
	filePattern: string;
	extension: string;
}

interface MakerConfig {
	configDirKey: "screen" | "api" | "hook" | "layout";
	templatePath: string;
	fileStructure: FileStructure;
	promptMessage?: string;
	getTemplateData?: (name: string) => Record<string, unknown>;
}

export const useMake = (config: MakerConfig) => {
	return async (name?: string): Promise<void> => {
		try {
			const appConfig = useReadConfig(env.configFile);
			const baseDir = appConfig?.dir?.[config.configDirKey];

			if (!baseDir) {
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
			const lowerProcessedName = processedName.toLowerCase();

			// Generate file paths based on patterns
			const { directoryPattern, filePattern, extension } = config.fileStructure;

			// Replace placeholders in patterns
			const resolvePattern = (pattern: string) => {
				return pattern
					.replace(/{name}/g, lowerProcessedName)
					.replace(/{Name}/g, processedName);
			};

			// Determine target directory and file paths
			let targetDirectory = baseDir;
			if (directoryPattern) {
				const dirName = resolvePattern(directoryPattern);
				targetDirectory = path.resolve(baseDir, dirName);
			}

			const fileName = resolvePattern(filePattern) + extension;
			const targetFile = path.join(targetDirectory, fileName);

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
					`Creating ${config.configDirKey} file ${chalk.yellow(fileName)}...`,
				),
			);

			// Read and render template
			const templateContent = await fs.promises.readFile(
				config.templatePath,
				"utf8",
			);

			// Combine default template data with custom data if provided
			const templateData = {
				name: processedName,
				createdAt: new Date().toISOString(),
				author: env.name || "unknown",
				...(config.getTemplateData
					? config.getTemplateData(processedName)
					: {}),
			};

			const renderedContent = ejs.render(templateContent, templateData);

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

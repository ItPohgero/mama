/**
 * @file main.ts
 * @description This file contains the `run` function that sets up and executes the main
 * command-line interface (CLI) functionality for the Mama CLI package. It integrates various
 * utilities and features, such as displaying a banner, handling configurations, and managing
 * errors during execution.
 *
 * The `run` function initializes the Commander.js CLI, sets its commands, description, version,
 * and options, and then triggers the appropriate actions based on user input.
 *
 * @author
 * Mataramandev <mataramandev.info@gmail.com>
 * Wahyu A. Arifin <itpohgero@gmail.com>
 *
 * @function run
 * @returns {void}
 * @description The main function that sets up and runs the Mama CLI tool.
 */

import chalk from "chalk";
import { Command } from "commander";
import Init from "./app/init";
import { NextFullstackCommands } from "./app/next-fullstack/commands";
import { NextCommands } from "./app/next/commands";
import { env } from "./configs/environtment";
import File from "./configs/files";
import { CheckType } from "./hooks/checkType";
import { readConfig } from "./hooks/config.files";
import { useConfigValidation } from "./hooks/use_configvalidation";
import banner from "./modules/banner";
import handleError from "./utils/error";
import { wording } from "./wording/main";

/**
 * Initializes and runs the Mama CLI program by configuring commands, version, help options,
 * and executing the corresponding actions. This function sets up the CLI interface.
 *
 * @function run
 * @returns {void}
 */
export function run(): void {
	try {
		const program = new Command();
		banner();
		const config = readConfig(File.Config);
		const { message, type, isValid } = useConfigValidation(config);
		program
			.name("mama")
			.description(chalk.yellow(message))
			.version(env.version, "-v, --version", wording.mama.version)
			.showHelpAfterError(chalk.red(wording.mama.showHelpAfterError))
			.helpOption("-h, --help", wording.mama.helpOption);

		// Set the "init" command
		program.command("init").description(wording.init.description).action(Init);

		if (isValid) {
			switch (type) {
				case "next":
					NextCommands(program);
					break;
				case "next-fullstack":
					NextFullstackCommands(program);
					break;
				default:
					break;
			}
		}

		// "generate" command for generating files
		// program
		// 	.command("generate")
		// 	.alias("g") // Add alias "g" for the generate command
		// 	.description("Generate a component or file") // Command description
		// 	.argument("<type>", "Type to generate (component/hook)") // First argument: type
		// 	.argument("<name>", "Name of the file to generate") // Second argument: name
		// 	.action((type: string, name: string) => {
		// 		let config = readConfig(File.Config); // Read the configuration
		// 		if (!config) {
		// 			// If no configuration found, display an error
		// 			console.log(
		// 				chalk.red(
		// 					"❌ Cannot proceed without a configuration. Run `mama init` first.",
		// 				),
		// 			);
		// 			return;
		// 		}

		// 		// Get the directory for the specified type
		// 		const directory = (config.dir as Record<string, string> | undefined)?.[
		// 			type
		// 		];
		// 		if (!directory) {
		// 			// If directory does not exist, create a new one
		// 			const newDir = `src/mama/${type}s`;
		// 			console.log(
		// 				chalk.yellow(
		// 					`⚠️ Directory for type "${type}" not found. Creating a new directory: ${newDir}`,
		// 				),
		// 			);

		// 			// Update the configuration with the new directory
		// 			updateConfig(File.Config, (currentConfig) => {
		// 				currentConfig.dir = {
		// 					...(currentConfig.dir as Record<string, string>),
		// 					[type]: newDir,
		// 				};
		// 				return currentConfig;
		// 			});
		// 			config = readConfig(File.Config); // Reload the configuration
		// 		}
		// 		// Determine the final directory
		// 		const finalDir = (config?.dir as Record<string, string>)?.[type];
		// 		const targetPath = File.Target({ name, finalDir, format: "ts" }); // Build the target path
		// 		fs.mkdirSync(path.dirname(targetPath), { recursive: true }); // Create the directory if it doesn't exist
		// 		fs.writeFileSync(targetPath, `// ${type}: ${name}\n`); // Create the file with a placeholder content
		// 		console.log(
		// 			chalk.green(`✨ ${type} created successfully: ${targetPath}`),
		// 		); // Success message
		// 	});

		// "init" command to initialize the project

		// Parse command-line arguments
		program.parse(process.argv);

		// Show help if no arguments are provided
		if (!process.argv.slice(2).length) {
			program.help(); // Use program.help() to display help
		}
	} catch (error) {
		// Handle errors
		if (error instanceof Error) {
			handleError(error); // Log the error using a utility function
		}
	}
}

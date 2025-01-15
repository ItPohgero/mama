import type { ChalkInstance } from "chalk";
import chalk from "chalk";
import type { Command } from "commander";

export const NextCommands = (program: Command) => {
	program
		.command("hello")
		.description("Display a greeting message") // Command description
		.option("-n, --name <name>", "Name to greet", "Dunia") // Name option with default value
		.option("-c, --color <color>", "Text color (red/green/blue)", "blue") // Color option with default value
		.action((options: { name: string; color: "red" | "green" | "blue" }) => {
			// Define available colors
			const colors: Record<string, ChalkInstance> = {
				red: chalk.red,
				green: chalk.green,
				blue: chalk.blue,
			};
			// Choose the color or fallback to blue
			const colorize = colors[options.color] || colors.blue;
			console.log(colorize(`👋 Hello, ${options.name}!`)); // Display the greeting
		});

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
};

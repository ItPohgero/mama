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
};

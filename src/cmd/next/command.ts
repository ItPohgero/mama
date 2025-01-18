import text from "@/lang/text";
import chalk from "chalk";
import type { Command } from "commander";
import { GenComponents } from "./gen/gen:components";
import { MakeScreen } from "./make/make:screen";

type GroupedCommands = {
	group: string; // Group name
	commands: {
		cmd: string; // Command name
		desc: string; // Description
		action: () => Promise<void>; // Action callback
	}[];
};

const groupedCommands: GroupedCommands[] = [
	{
		group: "make",
		commands: [
			{ cmd: "make:screen", desc: text.make.screen_desc, action: MakeScreen },
			{ cmd: "make:hooks", desc: text.make.screen_desc, action: MakeScreen },
		],
	},
	{
		group: "gen",
		commands: [
			{
				cmd: "gen:components",
				desc: text.gen.components_desc,
				action: GenComponents,
			},
		],
	},
];

export const CommandsNext = (program: Command) => {
	// Register commands dynamically
	for (const { commands } of groupedCommands) {
		for (const { cmd, desc, action } of commands) {
			program
				.command(cmd)
				.description(chalk.dim.gray(desc))
				.action(async () => await action());
		}
	}

	// Custom help configuration
	program.configureHelp({
		sortSubcommands: false,
		commandUsage: () => "mama [options] [command]",
		formatHelp: (cmd, helper) => {
			// Find the longest command name for alignment
			const maxCmdLength = Math.max(
				...cmd.commands.map((c) => c.name().length),
			);

			// Group commands
			const groupedCommandText = groupedCommands
				.map(({ group, commands }) => {
					const groupHeader = `${chalk.yellow(group)}\n`;
					const commandList = commands
						.map(({ cmd, desc }) => {
							const paddedCmd = cmd.padEnd(maxCmdLength + 2); // Add padding
							return `  ${chalk.green(paddedCmd)}${chalk.dim(desc)}`;
						})
						.join("\n");
					return groupHeader + commandList;
				})
				.join("\n\n");

			// Options
			const options = cmd.options.length
				? cmd.options
						.map((opt) => `  ${chalk.cyan(helper.optionTerm(opt))}`)
						.join("\n")
				: "No options available";

			// Format help output
			return [
				`Usage : ${helper.commandUsage(cmd)}\n`,
				`${chalk.bold("Options:")}\n${options}\n`,
				`${chalk.bold("Commands:")}\n${groupedCommandText}\n`,
				`${chalk.dim("Type 'mama help [command]' to learn more about a specific command.")}`,
			].join("\n");
		},
	});
};

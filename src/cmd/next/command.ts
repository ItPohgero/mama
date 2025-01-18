import text from "@/lang/text";
import type { GroupedCommands } from "@/types/command.type";
import chalk from "chalk";
import type { Command } from "commander";
import { GenComponents } from "./gen/gen:components";
import { MakeScreen } from "./make/make:screen";

const groupedCommands: GroupedCommands[] = [
	{
		group: "make",
		commands: [
			{
				cmd: "make:screen",
				arguments: [
					{
						key: "name",
						required: true,
						default: "main",
						description: "Name of the screen",
					},
				],
				desc: text.make.screen_desc,
				action: MakeScreen,
			},
			{
				cmd: "make:hooks",
				desc: text.make.screen_desc,
				action: MakeScreen,
			},
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
	for (const { commands } of groupedCommands) {
		for (const { cmd, desc, action, arguments: args } of commands) {
			const command = program.command(cmd);

			if (args) {
				for (const arg of args) {
					const notation = arg.required ? `<${arg.key}>` : `[${arg.key}]`;
					if (arg.required) {
						command.argument(notation, arg.description);
					} else {
						command.argument(notation, arg.description, arg.default);
					}
				}
			}

			command.description(chalk.dim.gray(desc)).action(async () => action());
		}
	}

	program.configureHelp({
		sortSubcommands: false,
		commandUsage: () => "mama [options] [command]",
		formatHelp: (cmd, helper) => {
			const maxCmdLength = Math.max(
				...cmd.commands.map((c) => c.name().length),
			);
			const groupedCommandText = groupedCommands
				.map(({ group, commands }) => {
					const groupHeader = `${chalk.yellow(group)}\n`;
					const commandList = commands
						.map(({ cmd, desc }) => {
							const paddedCmd = cmd.padEnd(maxCmdLength + 2);
							return `  ${chalk.green(paddedCmd)}${chalk.dim(desc)}`;
						})
						.join("\n");
					return groupHeader + commandList;
				})
				.join("\n\n");
			const options = cmd.options.length
				? cmd.options
						.map((opt) => `  ${chalk.cyan(helper.optionTerm(opt))}`)
						.join("\n")
				: "No options available";

			return [
				`Usage : ${helper.commandUsage(cmd)}\n`,
				`${chalk.bold("Options:")}\n${options}\n`,
				`${chalk.bold("Commands:")}\n${groupedCommandText}\n`,
				`${chalk.dim("Type 'mama help [command]' to learn more about a specific command.")}`,
			].join("\n");
		},
	});
};

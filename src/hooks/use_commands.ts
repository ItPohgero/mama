import type { GroupedCommands } from "@/types/command.type";
import chalk from "chalk";
import type { Command } from "commander";

export const useCommands = (
	program: Command,
	groupedCommands: GroupedCommands[],
) => {
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
				command
					.description(chalk.dim.gray(desc))
					.action(async (...passedArgs) => {
						const actionArgs = passedArgs.slice(0, -1);
						await action(...actionArgs);
					});
			} else {
				command.description(chalk.dim.gray(desc)).action(async () => action());
			}
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

			const helpText = "help [command] ".padEnd(maxCmdLength + 2);
			return [
				`Usage : ${helper.commandUsage(cmd)}\n`,
				`${chalk.bold("Options:")}\n${options}\n`,
				`${chalk.bold("Commands:")}\n${groupedCommandText}\n`,
				`${chalk.yellow("help")}\n  ${chalk.green(helpText)}${chalk.dim("Display help for command")}\n`,
			].join("\n");
		},
	});
};

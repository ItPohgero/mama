import text from "@/lang/text";
import chalk from "chalk";
import type { Command } from "commander";
import { MakeScreen } from "./make/make:screen";

export const CommandsNext = (program: Command) => {
	program
		.command("make:screen")
		.description(chalk.dim.gray(text.make.screen_desc))
		.action(async () => await MakeScreen());
};

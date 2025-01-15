import { Create } from "@/commands/create";
import Init from "@/commands/init";
import { CommandsNextFullstack } from "@/commands/next-fullstack/command";
import { CommandsNext } from "@/commands/next/command";
import { env } from "@/configs/environtment";
import { useReadConfig } from "@/hooks/use_configfiles";
import { useConfigValidation } from "@/hooks/use_configvalidation";
import { useWording } from "@/hooks/use_wording";
import banner from "@/modules/banner";
import handleError from "@/utils/error";
import chalk from "chalk";
import { Command } from "commander";
import { CommandsBunHono } from "./commands/bun-hono/command";
import { CommandsFlutter } from "./commands/flutter/command";
import { CommandsGolang } from "./commands/golang/command";
import type { TypeOptions } from "./configs/type";

interface ProgramConfig {
	type: TypeOptions | string | null;
	isValid: boolean;
}

class CLIProgram {
	private program: Command;
	private config: ReturnType<typeof useReadConfig>;
	private wording: ReturnType<typeof useWording>;
	private validation: ReturnType<typeof useConfigValidation>;

	constructor() {
		this.program = new Command();
		this.config = useReadConfig(env.configFile);
		this.wording = useWording();
		this.validation = useConfigValidation(this.config);
	}

	private setupBaseProgram(): void {
		this.program
			.name("mama")
			.description(chalk.yellow(this.validation.message))
			.version(env.version, "-v, --version", this.wording.mama.version)
			.showHelpAfterError(chalk.red(this.wording.mama.showHelpAfterError))
			.helpOption("-h, --help", this.wording.mama.helpOption);
	}

	private setupInitCommand(): void {
		this.program
			.command("init")
			.description(this.wording.init.description)
			.action(Init);
	}

	private setupProjectCommands({ type, isValid }: ProgramConfig): void {
		if (!isValid) {
			Create(this.program);
			return;
		}

		const commandHandlers: Record<TypeOptions, () => void> = {
			next: () => CommandsNext(this.program),
			next_fullstack: () => CommandsNextFullstack(this.program),
			bun_hono: () => CommandsBunHono(this.program),
			flutter: () => CommandsFlutter(this.program),
			golang: () => CommandsGolang(this.program),
		};

		const handler = commandHandlers[type as keyof typeof commandHandlers];
		if (handler) {
			handler();
		}
	}

	private showHelpIfNoArgs(): void {
		if (!process.argv.slice(2).length) {
			this.program.help();
		}
	}

	public run(): void {
		try {
			banner();
			this.setupBaseProgram();
			this.setupInitCommand();
			this.setupProjectCommands({
				type: this.validation.type,
				isValid: this.validation.isValid,
			});

			this.program.parse(process.argv);
			this.showHelpIfNoArgs();
		} catch (error) {
			if (error instanceof Error) {
				handleError(error);
			}
		}
	}
}

export function run(): void {
	const cli = new CLIProgram();
	cli.run();
}

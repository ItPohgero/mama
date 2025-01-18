import banner from "@/modules/banner";
import handleError from "@/utils/hadle-error";
import chalk from "chalk";
import { Command } from "commander";
import { CommandsAngular } from "./cmd/angular/command";
import { Create } from "./cmd/create";
import Init from "./cmd/init";
import { CommandsNext } from "./cmd/next/command";
import { env } from "./configs/environtment";
import { type TypeOptions, TypeOptionsData } from "./configs/types";
import { useReadConfig } from "./hooks/use_config_files";
import { useConfigValidation } from "./hooks/use_config_validation";
import text from "./lang/text";
import bannerinit from "./modules/banner_init";

interface ProgramConfig {
	type: TypeOptions | string | null;
	isValid: boolean;
}

class CLIProgram {
	private program: Command;
	private config: ReturnType<typeof useReadConfig>;
	private validation: ReturnType<typeof useConfigValidation>;

	constructor() {
		this.program = new Command();
		this.config = useReadConfig(env.configFile);
		this.validation = useConfigValidation(this.config);
	}

	private setupBaseProgram(): void {
		this.program
			.name("mama")
			.description(chalk.yellow(this.validation.message))
			.version(env.version, "-v, --version", text.mama.version)
			.showHelpAfterError(chalk.red(text.mama.showHelpAfterError))
			.helpOption("-h, --help", text.mama.helpOption);
	}

	private setupInitCommand(isMamaExist: boolean): void {
		if (!isMamaExist) {
			this.program
				.command("init")
				.description(text.init.description)
				.argument("[type]", text.create.argument.name, "next")
				.addHelpText(
					"before",
					chalk.yellow(`\nPlease choose type: ${TypeOptionsData.join(", ")} `),
				)
				.action((type: string) => Init(type as TypeOptions));
		}
	}

	private setupProjectCommands({ type, isValid }: ProgramConfig): void {
		if (!isValid) {
			Create(this.program);
			return;
		}

		const commandHandlers: Record<TypeOptions, () => void> = {
			next: () => CommandsNext(this.program),
			angular: () => CommandsAngular(this.program),
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
			if (!this.validation.isValid) {
				banner();
			} else {
				bannerinit();
			}
			this.setupBaseProgram();
			this.setupInitCommand(this.validation.isValid);
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

import { constant } from "../constant";
import chalk from "chalk";
import inquirer from "inquirer";

type GenType = {
    readonly name: string;
    readonly value: string;
    readonly short?: string;
    readonly description: string
}
const GEN_CHOICES: GenType[] = [
    {
        name: "Screen",
        value: "screen",
        short: "Screen",
        description: constant.screen_desc,
    },
    {
        name: "Layout",
        value: "layout",
        short: "Layout",
        description: constant.layout_desc,
    },
    {
        name: "Hook",
        value: "hook",
        short: "Hook",
        description: constant.hook_desc,
    },
    {
        name: "Api",
        value: "api",
        short: "API",
        description: constant.api_desc,
    },
    {
        name: "Call",
        value: "call",
        short: "Call",
        description: constant.call_desc,
    },
    {
        name: "Shared",
        value: "shared",
        short: "Shared",
        description: constant.shared_desc,
    },
] as const;
export const Generate = async () => {
    const maxNameLength = Math.max(...GEN_CHOICES.map(choice => choice.name.length));
    const { GenOptions } = await inquirer.prompt([
        {
            type: "list",
            name: "GenOptions",
            message: chalk.bold.blue("Generate your file:"),
            choices: GEN_CHOICES.map((choice) => ({
                name: `${chalk.bold(choice.name.padEnd(maxNameLength))}   ${chalk.dim.gray(`: ${choice.description}`)}`,
                value: choice.value,
                short: chalk.dim(choice.short || choice.name),
            })),
        },
    ]);

    console.log(
        `🚀 Mama help to creating ${GenOptions} application ${name}...`,
    );
};
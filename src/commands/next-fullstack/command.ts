// import { env } from "@/configs/environtment";
// import Files from "@/configs/files";
// import { useReadConfig, useUpdateConfig } from "@/hooks/use_configfiles";
import chalk from "chalk";
import type { Command } from "commander";
import inquirer from "inquirer";
import { MakeScreen } from "./dir/make:screen";
import { MakeLayout } from "./dir/make:layout";
import { MakeHook } from "./dir/make:hook";
import { MakeApi } from "./dir/make:api";
import { MakeCall } from "./dir/make:call";
import { MakeShared } from "./dir/make:shared";
import { constant } from "./constant";
import { Generate } from "./dir/generate";
// import fs from "node:fs";
// import path from "node:path";

interface GenerateChoices {
    readonly name: string;
    readonly value: string;
}
export const CommandsNextFullstack = (program: Command) => {
    program
        .command("make:screen")
        .description(chalk.dim.gray(constant.screen_desc))
        .action(async () => await MakeScreen())
    program
        .command("make:layout")
        .description(chalk.dim.gray(constant.layout_desc))
        .action(() => MakeLayout())
    program
        .command("make:hook")
        .description(chalk.dim.gray(constant.hook_desc))
        .action(() => MakeHook())
    program
        .command("make:api")
        .description(chalk.dim.gray(constant.api_desc))
        .action(() => MakeApi())
    program
        .command("make:call")
        .description(chalk.dim.gray(constant.call_desc))
        .action(() => MakeCall())
    program
        .command("make:shared")
        .description(chalk.dim.gray(constant.screen_desc))
        .action(() => MakeShared())


    // const config = useReadConfig(env.configFile); // Read the configuration
    // if (!config) {
    //     // If no configuration found, display an error
    //     console.log(
    //         chalk.red(
    //             "❌ Cannot proceed without a configuration. Run `mama init` first.",
    //         ),
    //     );
    //     return;
    // }
    // // Get the directory for the specified type
    // const directory = (config.dir as Record<string, string> | undefined)?.[
    //     type
    // ];
    // if (!directory) {
    //     // If directory does not exist, create a new one
    //     const newDir = `src/mama/${type}s`;
    //     console.log(
    //         chalk.yellow(
    //             `⚠️ Directory for type "${type}" not found. Creating a new directory: ${newDir}`,
    //         ),
    //     );

    //     // Update the configuration with the new directory
    //     useUpdateConfig(env.configFile, (currentConfig) => {
    //         currentConfig.dir = {
    //             ...(currentConfig.dir as Record<string, string>),
    //             [type]: newDir,
    //         };
    //         return currentConfig;
    //     });
    // }
    // // Determine the final directory
    // const finalDir = (config?.dir as Record<string, string>)?.[type];
    // const targetPath = Files.Target({ name, finalDir, format: "ts" }); // Build the target path
    // fs.mkdirSync(path.dirname(targetPath), { recursive: true }); // Create the directory if it doesn't exist
    // fs.writeFileSync(targetPath, `// ${type}: ${name}\n`); // Create the file with a placeholder content
    // console.log(
    //     chalk.green(`✨ ${type} created successfully: ${targetPath}`),
    // ); // Success message
    // });
};

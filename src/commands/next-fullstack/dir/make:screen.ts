import { env } from "@/configs/environtment";
import { useReadConfig } from "@/hooks/use_configfiles";
import chalk from "chalk";
import inquirer from "inquirer";

export const MakeScreen = async () => {
    const c = useReadConfig(env.configFile);
    const { name } = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: `${chalk.dim.gray("Screen Name (e.g., Login, Profile):")}`,
        },
    ])
    const processedName = `Screen${name
        .replace(/[^a-zA-Z\s]/g, "") 
        .replace(/\s+/g, "")
        .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number) =>
            index === 0 ? match.toUpperCase() : match.toLowerCase()
        )}`;
    console.log(chalk.green(`Mama creating screen ${chalk.yellow(processedName)} in ${chalk.yellow(`${c?.dir?.screen}/${processedName}`)}`));
};
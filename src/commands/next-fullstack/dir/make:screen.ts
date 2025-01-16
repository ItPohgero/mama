import { exec } from "node:child_process";
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
			message: `${chalk.dim.gray("Screen Name (misalnya, Login, Profile):")}`,
		},
	]);

	const processedName = `Screen${name
		.replace(/[^a-zA-Z\s]/g, "")
		.replace(/\s+/g, "")
		.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number) =>
			index === 0 ? match.toUpperCase() : match.toLowerCase(),
		)}`;

	const directory = c?.dir?.screen;
	console.log(
		chalk.green(
			`Mama sedang membuat screen ${chalk.yellow(processedName)} di ${chalk.yellow(`${directory}/${processedName}`)}`,
		),
	);

	exec(
		`bunx hygen screens new --name ${processedName} --directory ${directory}`,
		(error, stdout, stderr) => {
			if (error) {
				console.error(`error: ${error.message}`);
				return;
			}
			if (stderr) {
				console.error(`error: ${stderr}`);
				return;
			}
			console.log(`Success: ${stdout}`);
		},
	);
};

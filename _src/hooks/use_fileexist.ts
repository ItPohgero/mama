import fs from "node:fs";
import chalk from "chalk";
import inquirer from "inquirer";
export const useHandleFileExists = async (
	targetFile: string,
): Promise<boolean> => {
	if (!fs.existsSync(targetFile)) {
		return true;
	}

	const { overwrite } = await inquirer.prompt([
		{
			type: "confirm",
			name: "overwrite",
			message: chalk.yellow("File already exists. Overwrite?"),
			default: false,
		},
	]);

	if (!overwrite) {
		console.log(chalk.yellow("File creation cancelled."));
		return false;
	}

	return true;
};

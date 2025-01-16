import chalk from "chalk";

const handleError = (error: Error | unknown): never => {
	if (error instanceof Error) {
		console.error(chalk.red("Error:", error.message));
	} else {
		console.error(chalk.red("Error:", error));
	}
	process.exit(1);
};

export default handleError;

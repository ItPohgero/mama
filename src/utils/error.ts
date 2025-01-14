import chalk from "chalk";

const handleError = (error: Error): never => {
	console.error(chalk.red("Error:", error.message));
	process.exit(1);
};

export default handleError;

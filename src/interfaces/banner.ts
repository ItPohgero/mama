import chalk from "chalk";
import figlet from "figlet";

const banner = (): void => {
	console.log(
		chalk.blue(figlet.textSync("mama", { horizontalLayout: "full" })),
	);
	console.log(chalk.green("Mama CLI : Like a mama who helps her child grow."));
};

export default banner;

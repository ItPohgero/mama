import chalk from "chalk";
import figlet from "figlet";

const banner = (): void => {
	const title = chalk.blue(
		figlet.textSync("mama", { horizontalLayout: "full" }),
	);
	const desc = chalk.green("Mama CLI : Like a mama who helps her child grow.");
	console.log(title);
	console.log(desc);
};

export default banner;

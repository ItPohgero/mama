import chalk from "chalk";
import figlet from "figlet";

const banner = (): void => {
	console.log(
		chalk.blue(figlet.textSync("mama", { horizontalLayout: "full" })),
	);
};

export default banner;

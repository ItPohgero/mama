/**
 * @file banner.ts
 * @description This file defines the `banner` function, which prints a styled ASCII art banner
 * and a description message to the console. It is part of the Mama CLI package, designed to assist developers
 * like a nurturing guide.
 * 
 * @author
 * Mataramandev <mataramandev.info@gmail.com>
 * Wahyu A. Arifin <itpohgero@gmail.com>
 */

import chalk from "chalk";
import figlet from "figlet";

/**
 * Generates and displays a styled ASCII art banner along with a description message.
 * The banner is created using `figlet` and styled using `chalk`.
 *
 * @function banner
 * @returns {void}
 */
const banner = (): void => {
	// Generate ASCII art for the title
	const title = chalk.blue(
		figlet.textSync("mama", { horizontalLayout: "full" }),
	);

	// Define the description message with green styling
	const desc = chalk.green("Mama CLI : Like a mama who helps her child grow.");

	// Output the banner and description to the console
	console.log(title);
	console.log(desc);
};

export default banner;
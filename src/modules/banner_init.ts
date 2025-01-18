import { env } from "@/configs/environtment";
import chalk from "chalk";

const bannerinit = (): void => {
	const desc = chalk.bold(`MAMA CLI version : ${env.version}\n`);
	console.log(desc);
};

export default bannerinit;

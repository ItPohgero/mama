import fs from "node:fs";
import chalk from "chalk";

interface Config {
	dir?: Record<string, string>;
	[key: string]: unknown;
}

const createConfig = (
	filePath: string,
	config: Record<string, unknown>,
): void => {
	if (fs.existsSync(filePath)) {
		console.log(chalk.red(`❌ Configuration file already exists: ${filePath}`));
		return;
	}
	fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
	console.log(
		chalk.green(`✅ Configuration file created successfully: ${filePath}`),
	);
};

const updateConfig = (
	filePath: string,
	updater: (config: Record<string, unknown>) => Record<string, unknown>,
): void => {
	const config = readConfig(filePath) || {};
	const updatedConfig = updater(config);
	fs.writeFileSync(filePath, JSON.stringify(updatedConfig, null, 2));
	console.log(
		chalk.green(`✅ Configuration updated successfully: ${filePath}`),
	);
};

const readConfig = (filePath: string): Config | null => {
	if (!fs.existsSync(filePath)) {
		console.log(chalk.red(`❌ Configuration not found at: ${filePath}`));
		return null;
	}

	const rawData = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(rawData);
};

export { createConfig, updateConfig, readConfig };

import fs from "node:fs";
import chalk from "chalk";

const mamaConfigCreate = (
	filePath: string,
	config: Record<string, unknown>,
): void => {
	if (fs.existsSync(filePath)) {
		console.log(chalk.red(`❌ File konfigurasi sudah ada: ${filePath}`));
		return;
	}
	fs.writeFileSync(filePath, JSON.stringify(config, null, 2));
	console.log(chalk.green(`✅ File konfigurasi berhasil dibuat: ${filePath}`));
};

const mamaConfigUpdate = (
	filePath: string,
	updater: (config: Record<string, unknown>) => Record<string, unknown>,
): void => {
	const config = mamaConfigRead(filePath) || {};
	const updatedConfig = updater(config);
	fs.writeFileSync(filePath, JSON.stringify(updatedConfig, null, 2));
	console.log(chalk.green(`✅ Konfigurasi berhasil diperbarui: ${filePath}`));
};

const mamaConfigRead = (filePath: string): Record<string, unknown> | null => {
	if (!fs.existsSync(filePath)) {
		console.log(chalk.red(`❌ Konfigurasi tidak ditemukan di: ${filePath}`));
		return null;
	}

	const rawData = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(rawData);
};

export { mamaConfigCreate, mamaConfigUpdate, mamaConfigRead };

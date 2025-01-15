/**
 * @file config.files.ts
 * @description A module for handling YAML configuration files with create, update, and read operations.
 * This module provides type-safe functions for managing configuration files in YAML format.
 *
 * @author
 * Mataramandev <mataramandev.info@gmail.com>
 * Wahyu A. Arifin <itpohgero@gmail.com>
 */

import fs from "node:fs";
import { env } from "@/configs/environtment";
import type { WordingType } from "@/i18n/text.type";
import chalk from "chalk";
import yaml from "yaml";

const useWording = (): WordingType => {
	try {
		const filePath = env.wordingFile;
		const rawData = fs.readFileSync(filePath, "utf-8");
		return yaml.parse(rawData) as WordingType;
	} catch (error) {
		console.error(
			chalk.red(
				`Error reading configuration file: ${error instanceof Error ? error.message : "Unknown error"}`,
			),
		);
		throw error;
	}
};

export { useWording };

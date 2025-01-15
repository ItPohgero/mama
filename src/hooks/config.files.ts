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
import chalk from "chalk";
import yaml from "yaml";

/**
 * Configuration interface defining the structure of the config file
 * @interface Config
 * @property {Record<string, string>} [dir] - Optional directory mappings
 * @property {unknown} [key: string] - Additional dynamic properties
 */
interface Config {
	dir?: Record<string, string>;
	[key: string]: unknown;
}

/**
 * Creates a new YAML configuration file if it doesn't exist
 *
 * @param {string} filePath - The path where the configuration file should be created
 * @param {Record<string, unknown>} config - The configuration object to be written
 * @throws {Error} If there's an error writing the file
 * @returns {void}
 *
 */
const createConfig = (
	filePath: string,
	config: Record<string, unknown>,
): void => {
	try {
		// Check if file already exists
		if (fs.existsSync(filePath)) {
			console.log(
				chalk.red(`❌ Configuration file already exists: ${filePath}`),
			);
			return;
		}

		// Convert config to YAML with proper formatting options
		const yamlContent = yaml.stringify(config, {
			indent: 2,
			lineWidth: 0, // Prevents line wrapping
		});

		// Write the configuration file
		fs.writeFileSync(filePath, yamlContent, "utf-8");
		console.log(
			chalk.green(`✅ Configuration file created successfully: ${filePath}`),
		);
	} catch (error) {
		console.error(
			chalk.red(
				`Error creating configuration file: ${error instanceof Error ? error.message : "Unknown error"}`,
			),
		);
		throw error;
	}
};

/**
 * Updates an existing YAML configuration file using an updater function
 *
 * @param {string} filePath - The path to the configuration file
 * @param {function} updater - A function that takes the current config and returns the updated config
 * @throws {Error} If there's an error reading or writing the file
 * @returns {void}
 *
 */
const updateConfig = (
	filePath: string,
	updater: (config: Record<string, unknown>) => Record<string, unknown>,
): void => {
	try {
		// Read and update configuration
		const config = readConfig(filePath) || {};
		const updatedConfig = updater(config);

		// Convert updated config to YAML with proper formatting
		const yamlContent = yaml.stringify(updatedConfig, {
			indent: 2,
			lineWidth: 0,
		});

		// Write the updated configuration
		fs.writeFileSync(filePath, yamlContent, "utf-8");
		console.log(
			chalk.green(`✅ Configuration updated successfully: ${filePath}`),
		);
	} catch (error) {
		console.error(
			chalk.red(
				`Error updating configuration file: ${error instanceof Error ? error.message : "Unknown error"}`,
			),
		);
		throw error;
	}
};

/**
 * Reads and parses a YAML configuration file
 *
 * @param {string} filePath - The path to the configuration file to read
 * @throws {Error} If there's an error reading or parsing the file
 * @returns {Config | null} The parsed configuration object or null if file doesn't exist
 *
 */
const readConfig = (filePath: string): Config | null => {
	try {
		// Check if file exists
		if (!fs.existsSync(filePath)) {
			console.log(chalk.red(`❌ Configuration not found at: ${filePath}`));
			return null;
		}

		// Read and parse YAML file
		const rawData = fs.readFileSync(filePath, "utf-8");
		return yaml.parse(rawData) as Config;
	} catch (error) {
		console.error(
			chalk.red(
				`Error reading configuration file: ${error instanceof Error ? error.message : "Unknown error"}`,
			),
		);
		throw error;
	}
};

const initConfig = (filePath: string, yamlContent: string): void => {
	try {
		if (fs.existsSync(filePath)) {
			console.log(
				chalk.red(`❌ Configuration file already exists: ${filePath}`),
			);
			return;
		}
		fs.writeFileSync(filePath, yamlContent, "utf-8");
		console.log(
			chalk.green(`✅ Configuration file created successfully: ${filePath}`),
		);
	} catch (error) {
		console.error(
			chalk.red(
				`Error creating configuration: ${error instanceof Error ? error.message : "Unknown error"}`,
			),
		);
		throw error;
	}
};

export { createConfig, updateConfig, readConfig, initConfig };
export type { Config };

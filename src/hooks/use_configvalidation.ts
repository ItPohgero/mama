/**
 * @file useConfigValidation.ts
 * @description Hook for handling configuration validation and message formatting
 */

import { TypeOptionsData } from "@/configs/type";
import { useCheckType } from "@/hooks/use_checktype";
import type { Config } from "@/hooks/use_configfiles";
import type { ValidationResult } from "@/types/configvalidation.type";
import chalk from "chalk";

/**
 * Hook to validate configuration type and generate appropriate messages
 * @param config - The configuration object to validate
 * @returns ValidationResult object containing validation status and formatted message
 */
export const useConfigValidation = (
	config: Config | null,
): ValidationResult => {
	/**
	 * Generates formatted message based on config state
	 */
	const getValidationResult = (): ValidationResult => {
		// If no config exists
		if (!config) {
			return {
				message: chalk.yellow(
					"Please create new project with `mama create <name>` or init first with `mama init` in your existing project directory",
				),
				isValid: false,
				type: null,
			};
		}

		// If no type specified in config
		if (!config.type) {
			return {
				message: chalk.yellow("Type not specified in configuration"),
				isValid: false,
				type: null,
			};
		}

		// If type is valid
		if (useCheckType(config.type)) {
			return {
				message: chalk.green(`Type: ${config.type}`),
				isValid: true,
				type: config.type,
			};
		}

		// If type is invalid
		return {
			message: chalk.red(
				`Invalid type. Please choose: ${TypeOptionsData.join(", ")}`,
			),
			isValid: false,
			type: null,
		};
	};

	return getValidationResult();
};

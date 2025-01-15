/**
 * @file useConfigValidation.ts
 * @description Hook for handling configuration validation and message formatting
 */

import chalk from "chalk";
import type { TypeOptions } from "./checkType";


interface Config {
    type?: string;
    [key: string]: unknown;
}

interface ValidationResult {
    message: string;
    isValid: boolean;
    type: TypeOptions | null;
}

/**
 * Hook to validate configuration type and generate appropriate messages
 * @param config - The configuration object to validate
 * @returns ValidationResult object containing validation status and formatted message
 */
export const useConfigValidation = (config: Config | null): ValidationResult => {
    // Predefined valid types
    const VALID_TYPES: TypeOptions[] = ["next", "next-fullstack", "bun-hono", "flutter"];
    
    /**
     * Checks if the provided type is a valid TypeOption
     */
    const checkType = (type: string): type is TypeOptions => {
        return VALID_TYPES.includes(type as TypeOptions);
    };

    /**
     * Generates formatted message based on config state
     */
    const getValidationResult = (): ValidationResult => {
        // If no config exists
        if (!config) {
            return {
                message: chalk.yellow("Please init first with `mama init`"),
                isValid: false,
                type: null
            };
        }

        // If no type specified in config
        if (!config.type) {
            return {
                message: chalk.yellow("Type not specified in configuration"),
                isValid: false,
                type: null
            };
        }

        // If type is valid
        if (checkType(config.type)) {
            return {
                message: chalk.green(`Type: ${config.type}`),
                isValid: true,
                type: config.type
            };
        }

        // If type is invalid
        return {
            message: chalk.red(
                `Invalid type. Please choose: ${VALID_TYPES.join(", ")}`
            ),
            isValid: false,
            type: null
        };
    };

    return getValidationResult();
};
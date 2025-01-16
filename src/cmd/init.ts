/**
 * @file init.ts
 * @description Command untuk menginisialisasi konfigurasi project
 */

import { type TypeOptions, TypeOptionsData } from "@/configs/types";
import { useCheckType } from "@/hooks/use_check_type";
import chalk from "chalk";
import { env } from "../configs/environtment";
import { useInitConfig } from "../hooks/use_config_files";

const Init = (type: TypeOptions) => {
	if (!useCheckType(type)) {
		console.log(
			chalk.red(
				`Invalid type for init. Please choose: ${TypeOptionsData.join(", ")}; ex: mama init next`,
			),
		);
		return;
	}
	// Base directory configuration that's shared across all types
	const baseDir = {
		hook: "src/hooks",
		shared: "src/shared",
	};

	// Type-specific directory configurations
	const typeSpecificDirs = {
		next_fullstack: {
			...baseDir,
			component: "src/interfaces/components",
			screen: "src/interfaces/screens",
			layout: "src/interfaces/layouts",
			call: "src/services/call",
			api: "src/api",
		},
		next: {
			...baseDir,
			component: "src/interfaces/components",
			screen: "src/interfaces/screens",
			layout: "src/interfaces/layouts",
			call: "src/services/call",
		},
		flutter: {
			...baseDir,
			widget: "src/interfaces/widgets",
		},
		bun_hono: {
			...baseDir,
			controller: "src/controllers",
			middleware: "src/middleware",
			route: "src/routes",
		},
	};

	// Get directory configuration based on project type
	const dirConfig =
		typeSpecificDirs[type as keyof typeof typeSpecificDirs] || baseDir;

	const yamlContent = `
# Mama CLI Configuration File
# Generated at: ${new Date().toISOString()}
# Author: Mataraman Dev & Wahyu A. Arifin
# Version: ${env.version}

# Project name
name: mama

# Project type (available options: next, next_fullstack, bun_hono, flutter, golang)
type: ${type}

# Directory configurations
dir:
${Object.entries(dirConfig)
	.map(([key, value]) => `    ${key}: ${value}`)
	.join("\n")}
`;

	useInitConfig(env.configFile, yamlContent);
};

export default Init;

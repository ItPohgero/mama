/**
 * @file init.ts
 * @description Command untuk menginisialisasi konfigurasi project
 */

import { env } from "../configs/environtment";
import File from "../configs/files";
import { initConfig } from "../hooks/config.files";

const Init = () => {
	const yamlContent = `
# Mama CLI Configuration File
# Generated at: ${new Date().toISOString()}
# Author: Mataraman Dev & Wahyu A. Arifin
# Version: ${env.version}

# Project name
name: mama

# Project type (available options: next, next-fullstack, bun-hono, flutter)
type: next-fullstack

# Directory configurations
dir:
    # React/Next.js components directory
    components: src/components
    # Custom hooks directory
    hooks: src/hooks
`;

	initConfig(File.Config, yamlContent);
};

export default Init;

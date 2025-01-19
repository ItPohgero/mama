import fs from "node:fs";
import path from "node:path";
import { TEMPLATES } from "@/cmd/create";
import type { TypeOptions } from "@/configs/types";
import { copyDir } from "@/hooks/use_copy_dir";
import chalk from "chalk";

export const createProject = (TypeOptions: TypeOptions, name: string): void => {
	const template = TEMPLATES[TypeOptions];
	const projectPath = path.join(process.cwd(), name);

	if (!fs.existsSync(template.path)) {
		throw new Error(`Template directory not found: ${template.path}`);
	}

	// Create project directory
	if (!fs.existsSync(projectPath)) {
		fs.mkdirSync(projectPath, { recursive: true });
	}
	copyDir(template.path, projectPath, {
		ignore: [".next", "node_modules", ".git", "dist"], // Add folders or files to ignore
		onProgress: ({ percent, file, size }) => {
			// console.log(`${percent}% - Copying ${file} (${(size / 1024).toFixed(2)} KB)`);
			console.log(
				`${percent}% - ${chalk.green(file)} (${(size / 1024).toFixed(2)} KB)`,
			);
		},
	});
};

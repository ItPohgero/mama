import fs from "node:fs";
import path from "node:path";
import { TEMPLATES } from "@/cmd/create";
import type { TypeOptions } from "@/configs/types";
import { cloneRepository } from "@/hooks/use_clone";
import { copyDir } from "@/hooks/use_copy_dir";
import chalk from "chalk";

export const createProject = async (
	TypeOptions: TypeOptions,
	name: string,
): Promise<void> => {
	const template = TEMPLATES[TypeOptions];
	const projectPath = path.join(process.cwd(), name);

	if (!fs.existsSync(template.path)) {
		throw new Error(`Template directory not found: ${template.path}`);
	}

	// Create project directory
	if (!fs.existsSync(projectPath)) {
		fs.mkdirSync(projectPath, { recursive: true });
	}
	await cloneRepository(
		"https://github.com/dev-mataraman/mama-nextjs-fullstack.git",
		name,
	);

	// copyDir(template.path, projectPath, {
	// 	ignore: [".next", "node_modules", ".git", "dist"], // Add folders or files to ignore
	// 	onProgress: ({ percent, file, size }) => {
	// 		// console.log(`${percent}% - Copying ${file} (${(size / 1024).toFixed(2)} KB)`);
	// 		console.log(
	// 			`${percent}% - ${chalk.green(file)} (${(size / 1024).toFixed(2)} KB)`,
	// 		);
	// 	},
	// });
};

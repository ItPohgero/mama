import fs from "node:fs";
import path from "node:path";
import { TEMPLATES } from "@/cmd/create";
import type { TypeOptions } from "@/configs/types";
import { copyDir } from "@/hooks/use_copydir";

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
	// Copy template files
	copyDir(template.path, projectPath, (progress) => {
		process.stdout.write(`\rProgress: ${Math.round(progress)}%`);
	});
};

import { exec } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { TEMPLATES } from "@/cmd/create";
import type { TypeOptions } from "@/configs/types";
import { cloneRepository } from "@/hooks/use_clone";

export const createProject = async (
	TypeOptions: TypeOptions,
	name: string,
): Promise<void> => {
	const template = TEMPLATES[TypeOptions];
	const projectPath = path.join(process.cwd(), name);

	if (!fs.existsSync(projectPath)) {
		fs.mkdirSync(projectPath, { recursive: true });
	}
	await cloneRepository(template?.repo, name);
	exec(template.mama);
};

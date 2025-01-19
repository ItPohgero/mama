import fs from "node:fs";
import path from "node:path";
import { env } from "@/configs/environtment";
import type { PackageJson } from "@/types/create.types";

export const updatePackageJson = (
	projectPath: string,
	newName: string,
): void => {
	const packageJsonPath = path.join(projectPath, "package.json");

	if (!fs.existsSync(packageJsonPath)) {
		return;
	}

	try {
		const content = fs.readFileSync(packageJsonPath, "utf8");
		const packageJson = JSON.parse(content) as PackageJson;
		packageJson.name = newName;
		if (
			packageJson.dependencies &&
			typeof packageJson.dependencies === "object"
		) {
			(packageJson.dependencies as Record<string, string>)["mama-cli"] =
				env.version;
		}
		fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
	} catch (error) {
		if (error instanceof Error) {
			console.warn(`Warning: Could not update package.json: ${error.message}`);
		}
	}
};

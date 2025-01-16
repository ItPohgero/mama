import fs from "node:fs";
import path from "node:path";

export const copyDir = (src: string, dest: string): void => {
	// Create destination directory if it doesn't exist
	if (!fs.existsSync(dest)) {
		fs.mkdirSync(dest, { recursive: true });
	}

	// Read source directory
	const entries = fs.readdirSync(src, { withFileTypes: true });

	for (const entry of entries) {
		const srcPath = path.join(src, entry.name);
		const destPath = path.join(dest, entry.name);

		if (entry.isDirectory()) {
			copyDir(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
};

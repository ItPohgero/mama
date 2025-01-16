import fs from "node:fs";
import path from "node:path";

export const copyDir = (
	src: string,
	dest: string,
	onProgress?: (progress: number) => void,
): void => {
	// Helper function to count all files
	const countFiles = (directory: string): number => {
		const entries = fs.readdirSync(directory, { withFileTypes: true });
		return entries.reduce((count, entry) => {
			const entryPath = path.join(directory, entry.name);
			if (entry.isDirectory()) {
				return count + countFiles(entryPath);
			}
			return count + 1;
		}, 0);
	};

	// Total files to copy
	const totalFiles = countFiles(src);
	let copiedFiles = 0;
	let lastProgress = 0;

	// Recursive function to copy files
	const copyRecursive = (source: string, destination: string) => {
		if (!fs.existsSync(destination)) {
			fs.mkdirSync(destination, { recursive: true });
		}

		const entries = fs.readdirSync(source, { withFileTypes: true });
		for (const entry of entries) {
			const srcPath = path.join(source, entry.name);
			const destPath = path.join(destination, entry.name);

			if (entry.isDirectory()) {
				copyRecursive(srcPath, destPath);
			} else {
				fs.copyFileSync(srcPath, destPath);
				copiedFiles++;

				// Calculate progress
				const currentProgress = Math.min((copiedFiles / totalFiles) * 100, 100);

				// Ensure progress never decreases
				if (currentProgress < lastProgress) {
					throw new Error(
						`Progress error: Current progress (${currentProgress}%) is less than last progress (${lastProgress}%).`,
					);
				}

				lastProgress = currentProgress;

				// Trigger progress callback
				if (onProgress) {
					onProgress(lastProgress);
				}
			}
		}
	};

	copyRecursive(src, dest);
};

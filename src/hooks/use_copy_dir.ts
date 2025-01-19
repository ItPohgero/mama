import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import Table from "cli-table3";

interface Progress {
	percent: number;
	file: string;
	size: number;
}

export const copyDir = (
	src: string,
	dest: string,
	options?: {
		ignore?: string[];
		onProgress?: (progress: Progress) => void;
	},
): void => {
	const { ignore = [], onProgress } = options || {};

	const countFilesAndSize = (
		directory: string,
	): { count: number; size: number } => {
		const entries = fs.readdirSync(directory, { withFileTypes: true });
		return entries.reduce(
			(acc, entry) => {
				const entryPath = path.join(directory, entry.name);
				if (ignore.includes(entry.name)) {
					return acc;
				}

				if (entry.isDirectory()) {
					const { count, size } = countFilesAndSize(entryPath);
					acc.count += count;
					acc.size += size;
				} else {
					acc.count += 1;
					acc.size += fs.statSync(entryPath).size;
				}
				return acc;
			},
			{ count: 0, size: 0 },
		);
	};

	const { count: totalFiles, size: totalSize } = countFilesAndSize(src);
	let copiedFiles = 0;

	const table = new Table({
		chars: { mid: "", "left-mid": "", "mid-mid": "", "right-mid": "" },
		head: [chalk.green("%"), chalk.green("File"), chalk.green("Size (KB)")],
		colWidths: [6, 50, 12],
	});

	const copyRecursive = (source: string, destination: string) => {
		if (!fs.existsSync(destination)) {
			fs.mkdirSync(destination, { recursive: true });
		}

		const entries = fs.readdirSync(source, { withFileTypes: true });
		for (const entry of entries) {
			const srcPath = path.join(source, entry.name);
			const destPath = path.join(destination, entry.name);

			if (ignore.includes(entry.name)) {
				continue;
			}

			if (entry.isDirectory()) {
				copyRecursive(srcPath, destPath);
			} else {
				const fileSize = fs.statSync(srcPath).size;
				fs.copyFileSync(srcPath, destPath);
				copiedFiles++;

				const percent = Math.round((copiedFiles / totalFiles) * 100);

				if (onProgress) {
					onProgress({
						percent,
						file: path.relative(src, srcPath),
						size: fileSize,
					});
				}

				// Add progress to the table
				table.push([
					`${percent}%`,
					path.relative(src, srcPath),
					`${(fileSize / 1024).toFixed(2)}`,
				]);

				// Clear console and display updated table
				console.clear();
				console.log(chalk.green("Copying files..."));
				console.log(table.toString());
			}
		}
	};

	copyRecursive(src, dest);
};

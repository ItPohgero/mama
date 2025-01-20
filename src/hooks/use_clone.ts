import { exec } from "node:child_process";
import chalk from "chalk";

interface CloneProgress {
	stage: string;
	percent: number;
	received: number;
	total: number;
}

export const cloneRepository = (
	repoUrl: string,
	targetDir: string,
): Promise<void> => {
	return new Promise((resolve, reject) => {
		const gitCommand = `git clone --progress ${repoUrl} ${targetDir}`;
		const process = exec(gitCommand);

		const formatSize = (bytes: number): string => {
			if (bytes === 0) return "0 Bytes";
			const k = 1024;
			const sizes = ["Bytes", "KB", "MB", "GB"];
			const i = Math.floor(Math.log(bytes) / Math.log(k));
			return `${Number.parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
		};

		const displayProgress = (progress: CloneProgress, rawOutput: string) => {
			// Extract actual size information from git output
			const sizeMatch = rawOutput.match(/\d+\.\d+\s*(KiB|MiB|GiB)/);
			const sizeInfo = sizeMatch ? ` (${sizeMatch[0]})` : "";

			console.log(
				`${progress.percent}% - ${chalk.green(progress.stage)}${sizeInfo}`,
			);
		};

		let currentProgress: CloneProgress = {
			stage: "Initializing",
			percent: 0,
			received: 0,
			total: 0,
		};

		if (process.stderr) {
			process.stderr.on("data", (data: Buffer) => {
				const output = data.toString();

				// Parse git progress output
				if (output.includes("Receiving objects")) {
					const match = output.match(
						/Receiving objects:\s+(\d+)%\s+\((\d+)\/(\d+)\)/,
					);
					if (match) {
						currentProgress = {
							stage: "Receiving objects",
							percent: Number.parseInt(match[1]),
							received: Number.parseInt(match[2]),
							total: Number.parseInt(match[3]),
						};
						displayProgress(currentProgress, output);
					}
				} else if (output.includes("Resolving deltas")) {
					const match = output.match(
						/Resolving deltas:\s+(\d+)%\s+\((\d+)\/(\d+)\)/,
					);
					if (match) {
						currentProgress = {
							stage: "Resolving deltas",
							percent: Number.parseInt(match[1]),
							received: Number.parseInt(match[2]),
							total: Number.parseInt(match[3]),
						};
						displayProgress(currentProgress, output);
					}
				} else if (output.includes("remote: Counting objects")) {
					currentProgress = {
						...currentProgress,
						stage: "Counting objects",
						percent: 0,
					};
					displayProgress(currentProgress, output);
				} else if (output.includes("remote: Compressing objects")) {
					currentProgress = {
						...currentProgress,
						stage: "Compressing objects",
						percent: 0,
					};
					displayProgress(currentProgress, output);
				}
			});
		}

		process.on("error", (error) => {
			reject(error);
		});
		process.on("close", (code) => {
			if (code === 0) {
				resolve();
			} else {
				reject(new Error(`Git clone failed with exit code ${code}`));
			}
		});
	});
};

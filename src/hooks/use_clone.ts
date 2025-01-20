import { spawn } from "node:child_process";

export const cloneRepository = (
	repoUrl: string,
	targetDir: string,
): Promise<void> => {
	return new Promise((resolve, reject) => {
		const gitCommand = spawn("git", [
			"clone",
			"--progress",
			repoUrl,
			targetDir,
		]);
		gitCommand.stderr.on("data", (data) => {
			const message = data.toString();
			const progressMatch = message.match(/Receiving objects:\s+(\d+)%/);
			if (progressMatch) {
				const progress = Number.parseInt(progressMatch[1], 10);
				process.stdout.write(`\rCreating application: ${progress}%`);
			}
		});

		gitCommand.on("error", (error) => {
			reject(error);
		});

		gitCommand.on("close", (code) => {
			if (code === 0) {
				resolve();
			} else {
				process.stdout.write("\n");
				reject(new Error(`Git clone failed with exit code ${code}`));
			}
		});
	});
};

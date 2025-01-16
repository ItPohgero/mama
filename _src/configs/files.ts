import path from "node:path";

const Files = {
	Target: ({
		name,
		finalDir,
		format,
	}: {
		name: string;
		finalDir: string;
		format: string;
	}): string => path.join(process.cwd(), finalDir, `${name}.${format}`),
};

export default Files;

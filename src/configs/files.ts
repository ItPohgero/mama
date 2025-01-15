import path from "node:path";

type FileTargetType = { name: string; finalDir: string; format: string };

const File = {
	Config: path.join(process.cwd(), "mama.json"),
	Target: ({ name, finalDir, format }: FileTargetType) => {
		return path.join(process.cwd(), finalDir, `${name}.${format}`);
	},
};
export default File;

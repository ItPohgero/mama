import path from "node:path";
import { useMake } from "@/hooks/use_make";

const SCREEN_TEMPLATE = path.join(
	__dirname,
	"../../../template/next/init/make/screen.ejs.t",
);

export const MakeScreen = useMake({
	configDirKey: "screen",
	templatePath: SCREEN_TEMPLATE,
	fileStructure: {
		directoryPattern: "screen_{name}",
		filePattern: "main",
		extension: ".tsx",
	},
	promptMessage: "Enter screen name (e.g., login, profile):",
});

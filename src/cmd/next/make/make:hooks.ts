import path from "node:path";
import { useMake } from "@/hooks/use_make";

const TEMPLATE = path.join(
	__dirname,
	"../../../template/next/init/make/hooks.ejs.t",
);

export const MakeHooks = useMake({
	configDirKey: "hook",
	templatePath: TEMPLATE,
	fileStructure: {
		directoryPattern: undefined,
		filePattern: "use_{name}",
		extension: ".ts",
	},
	promptMessage: "Enter hook name (e.g., auth, theme):",
});

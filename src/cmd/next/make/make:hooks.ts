import path from "node:path";
import { useMake } from "@/hooks/use_make";

// makeHooks.ts
const HOOKS_TEMPLATE = path.join(
	__dirname,
	"../../../template/next/init/make/hooks.ejs.t",
);

export const MakeHooks = useMake({
	configDirKey: "hook",
	templatePath: HOOKS_TEMPLATE,
	fileStructure: {
		directoryPattern: undefined,
		filePattern: "use_{name}",
		extension: ".ts",
	},
	promptMessage: "Enter hook name (e.g., auth, theme):",
});

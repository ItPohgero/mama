import path from "node:path";
import { useMake } from "@/hooks/use_make";

// makeHooks.ts
const HOOKS_TEMPLATE = path.join(
	__dirname,
	"../../../template/next/init/make/hooks.ejs.t",
);

export const MakeHooks = useMake({
	configDirKey: "hooks",
	templatePath: HOOKS_TEMPLATE,
	filePrefix: "use_",
	fileExtension: ".ts",
	promptMessage: "Enter hook name (e.g., auth, theme):",
});

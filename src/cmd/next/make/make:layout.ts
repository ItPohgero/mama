import path from "node:path";
import { useMake } from "@/hooks/use_make";

const TEMPLATE = path.join(
	__dirname,
	"../../../template/next/init/make/layout.ejs.t",
);

export const MakeLayout = useMake({
	configDirKey: "layout",
	templatePath: TEMPLATE,
	fileStructure: {
		directoryPattern: "layout_{name}",
		filePattern: "main",
		extension: ".tsx",
	},
	promptMessage: "Enter layout name (e.g., login, profile):",
});

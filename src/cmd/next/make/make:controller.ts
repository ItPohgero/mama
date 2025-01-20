import path from "node:path";
import { useMake } from "@/hooks/use_make";

const TEMPLATE_CONTROLLER = path.join(
	__dirname,
	"../../../template/next/init/make/controller.ejs.t",
);
export const MakeController = useMake({
	configDirKey: "controller",
	templatePath: TEMPLATE_CONTROLLER,
	fileStructure: {
		directoryPattern: undefined,
		filePattern: "{name}.controller",
		extension: ".ts",
	},
});

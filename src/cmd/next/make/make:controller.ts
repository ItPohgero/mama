import path from "node:path";
import { useMake } from "@/hooks/use_make";
import inquirer from "inquirer";

const TEMPLATE_CONTROLLER = path.join(
	__dirname,
	"../../../template/next/init/make/controller.ejs.t",
);
export const MakeController = async () => {
	const { name } = await inquirer.prompt([
		{
			type: "input",
			name: "name",
			message: "Enter controller name:",
		},
	]);

	// Create controller file
	const run_controller = useMake({
		configDirKey: "controller",
		templatePath: TEMPLATE_CONTROLLER,
		fileStructure: {
			directoryPattern: undefined,
			filePattern: `${name}.controller`,
			extension: ".ts",
		},
	});
	await run_controller(name);
};

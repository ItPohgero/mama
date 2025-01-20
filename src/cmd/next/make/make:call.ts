import path from "node:path";
import { useMake } from "@/hooks/use_make";
import inquirer from "inquirer";

const TEMPLATE_QUERY = path.join(
	__dirname,
	"../../../template/next/init/make/call_query.ejs.t",
);
const TEMPLATE_MUTATION = path.join(
	__dirname,
	"../../../template/next/init/make/call_mutation.ejs.t",
);
const SCHEMA = path.join(
	__dirname,
	"../../../template/next/init/make/schema.ejs.t",
);

export const MakeCall = async () => {
	const { method, name } = await inquirer.prompt([
		{
			type: "list",
			name: "method",
			message: "Select HTTP method:",
			choices: ["get", "post", "put", "delete", "patch"],
		},
		{
			type: "input",
			name: "name",
			message: "Enter the call name:",
		},
	]);
	const GET = method === "get";
	const run_call = useMake({
		configDirKey: "call",
		templatePath: GET ? TEMPLATE_QUERY : TEMPLATE_MUTATION,
		fileStructure: {
			directoryPattern: undefined,
			filePattern: "call_{name}",
			extension: ".ts",
		},
	});
	await run_call(name);
	if (!GET) {
		const run_call = useMake({
			configDirKey: "schema",
			templatePath: SCHEMA,
			fileStructure: {
				directoryPattern: undefined,
				filePattern: "{name}.schema",
				extension: ".ts",
			},
		});
		await run_call(name);
	}
};

import path from "node:path";

const TEMPLATE_FILE = [
	{
		key: "list",
		value: path.join(
			__dirname,
			"../../../template/next/init/gen/components/list.ejs.t",
		),
	},
	{
		key: "typewriter",
		value: path.join(
			__dirname,
			"../../../template/next/init/gen/components/typewriter.ejs.t",
		),
	},
];

const COMPONENTS = ["list", "typewriter"];

export { TEMPLATE_FILE, COMPONENTS };

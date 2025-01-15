import pkg from "../../package.json" assert { type: "json" };

export const env = {
	name: pkg.name,
	author: pkg.author,
	version: pkg.version,
};

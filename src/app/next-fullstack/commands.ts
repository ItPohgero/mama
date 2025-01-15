import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";
import type { Command } from "commander";

export const NextFullstackCommands = (program: Command) => {
	program
		.command("new")
		.description("Create a new next-fullstack application")
		.argument("<name>", "Name of the application")
		.action(async (name: string) => {
			try {
				try {
					execSync("degit -v", { stdio: "ignore" });
				} catch {
					console.log("📦 Installing degit...");
					execSync("npm install -g degit", { stdio: "inherit" });
				}

				console.log(`🚀 Mama help to creating application ${name}...`);
				execSync(`degit ItPohgero/next-architecture ${name}`, {
					stdio: "inherit",
				});
				process.chdir(name);

				const packageJsonPath = path.join(process.cwd(), "package.json");
				const packageJson = JSON.parse(
					fs.readFileSync(packageJsonPath, "utf8"),
				);
				packageJson.name = name;
				fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

				console.log(`
✨ Application ready! Built with Next.js Architecture.

To get started:
cd ${name}
pnpm install
pnpm run dev

Happy coding guys! 🎉
by: @mataramandev
                `);
			} catch (error) {
				console.error("❌ Error creating application:", error);
				process.exit(1);
			}
		});
};

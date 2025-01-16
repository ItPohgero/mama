import fs from "node:fs";
import path from "node:path";
import { env } from "@/configs/environtment";
import { useReadConfig } from "@/hooks/use_configfiles";
import chalk from "chalk";
import ejs from "ejs";
import inquirer from "inquirer";

const TEMPLATE_DIR = path.resolve(__dirname, "./templates/next_fullstack");

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string: string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

export const MakeScreen = async () => {
	try {
		const c = useReadConfig(env.configFile);

		// Validate config
		if (!c?.dir?.screen) {
			throw new Error(
				"Screen directory not configured. Please check your config file.",
			);
		}

		// Get screen name from user
		const { name } = await inquirer.prompt([
			{
				type: "input",
				name: "name",
				message: chalk.dim.gray("Nama file (misalnya, Login, Profile):"),
				validate: (input: string) => {
					if (!input.trim()) {
						return "Nama file tidak boleh kosong";
					}
					return true;
				},
			},
		]);

		// Process filename - ensure it starts with capital letter
		const processedName = capitalizeFirstLetter(
			name
				.replace(/[^a-zA-Z\s]/g, "")
				.replace(/\s+/g, "")
				.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number) =>
					index === 0 ? match.toLowerCase() : match.toLowerCase(),
				),
		);

		const fileType = ".tsx";
		const targetDir = path.resolve(c.dir.screen);
		const targetFile = path.join(
			targetDir,
			`${processedName}Screen${fileType}`,
		);
		const templateFile = path.join(TEMPLATE_DIR, "screen.ejs.t");

		// Check if template exists
		if (!fs.existsSync(templateFile)) {
			throw new Error(`Template file tidak ditemukan di: ${templateFile}`);
		}

		// Check if target file already exists
		if (fs.existsSync(targetFile)) {
			const { overwrite } = await inquirer.prompt([
				{
					type: "confirm",
					name: "overwrite",
					message: chalk.yellow(
						`File ${processedName}${fileType} sudah ada. Timpa file?`,
					),
					default: false,
				},
			]);

			if (!overwrite) {
				console.log(chalk.yellow("Pembuatan file dibatalkan."));
				return;
			}
		}

		// Create directory structure
		console.log(chalk.blue(`Memeriksa direktori: ${targetDir}`));
		await fs.promises.mkdir(targetDir, { recursive: true });

		// Read and render template
		console.log(
			chalk.blue(`Membuat file ${chalk.yellow(processedName + fileType)}...`),
		);
		const templateContent = await fs.promises.readFile(templateFile, "utf8");
		const renderedContent = ejs.render(templateContent, {
			name: processedName, // This will now always be capitalized
			createdAt: new Date().toISOString(),
			author: env.name || "unknown",
		});

		// Write file
		await fs.promises.writeFile(targetFile, renderedContent, "utf8");

		console.log(
			chalk.green(`✓ File berhasil dibuat di: ${chalk.yellow(targetFile)}`),
		);

		// Show next steps
		console.log(chalk.dim.gray("\nLangkah selanjutnya:"));
		console.log(chalk.dim.gray(`1. Buka file: ${targetFile}`));
		console.log(chalk.dim.gray("2. Sesuaikan komponen sesuai kebutuhan"));
		console.log(
			chalk.dim.gray("3. Import komponen di halaman yang diinginkan\n"),
		);
	} catch (error) {
		if (error instanceof Error) {
			console.error(chalk.red(`\n✗ Error: ${error.message}`));
			if (error.message.includes("not configured")) {
				console.log(
					chalk.dim.gray("\nPastikan konfigurasi berikut ada di config file:"),
				);
				console.log(chalk.dim.gray("dir: { screen: 'path/to/screens' }"));
			}
		} else {
			console.error(chalk.red("\n✗ Terjadi kesalahan yang tidak diketahui"));
		}
		process.exit(1);
	}
};

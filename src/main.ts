import fs from "node:fs";
import path from "node:path";
import chalk, { type ChalkInstance } from "chalk";
import { Command } from "commander";
import pkg from "../package.json" assert { type: "json" };
import {
	mamaConfigCreate,
	mamaConfigRead,
	mamaConfigUpdate,
} from "./hooks/config.files";
import banner from "./interfaces/banner";
import handleError from "./utils/error";

export function run(): void {
	try {
		const program = new Command();
		const configFilePath = path.join(process.cwd(), "mama.json");
		// Display banner
		banner();

		// Set version dan deskripsi
		program
			.name("wahyu")
			.description(chalk.yellow("🚀 Tool untuk mempercepat development"))
			.version(pkg.version, "-v, --version", "Menampilkan versi CLI")
			.showHelpAfterError(
				chalk.red("(Gunakan --help untuk informasi lebih lanjut)"),
			)
			.helpOption("-h, --help", "Menampilkan bantuan untuk perintah");

		// Command hello dengan opsi tambahan
		program
			.command("hello")
			.description("Menampilkan pesan sapaan")
			.option("-n, --name <name>", "Nama yang akan disapa", "Dunia")
			.option("-c, --color <color>", "Warna teks (red/green/blue)", "blue")
			.action((options: { name: string; color: "red" | "green" | "blue" }) => {
				const colors: Record<string, ChalkInstance> = {
					red: chalk.red,
					green: chalk.green,
					blue: chalk.blue,
				};
				const colorize = colors[options.color] || colors.blue;
				console.log(colorize(`👋 Halo, ${options.name}!`));
			});

		// Command generate
		program
			.command("generate")
			.alias("g")
			.description("Generate komponen atau file")
			.argument("<type>", "Tipe yang akan digenerate (component/hook)")
			.argument("<name>", "Nama file yang akan digenerate")
			.action((type: string, name: string) => {
				let config = mamaConfigRead(configFilePath);
				if (!config) {
					console.log(
						chalk.red(
							"❌ Tidak dapat melanjutkan tanpa konfigurasi. Jalankan `mama init` terlebih dahulu.",
						),
					);
					return;
				}

				// Periksa apakah direktori untuk tipe sudah ada
				const directory = config.dir?.[type];
				if (!directory) {
					const newDir = `src/mama/${type}s`;
					console.log(
						chalk.yellow(
							`⚠️ Direktori untuk tipe "${type}" tidak ditemukan. Membuat direktori baru: ${newDir}`,
						),
					);

					// Tambahkan tipe baru ke konfigurasi dan buat direktori
					mamaConfigUpdate(configFilePath, (currentConfig) => {
						currentConfig.dir = {
							...currentConfig.dir,
							[type]: newDir,
						};
						return currentConfig;
					});

					config = mamaConfigRead(configFilePath); // Perbarui konfigurasi setelah menulis
				}

				const finalDir = config?.dir?.[type];
				const targetPath = path.join(process.cwd(), finalDir, `${name}.ts`);
				fs.mkdirSync(path.dirname(targetPath), { recursive: true });
				fs.writeFileSync(targetPath, `// ${type}: ${name}\n`);
				console.log(chalk.green(`✨ ${type} berhasil dibuat: ${targetPath}`));
			});

		// Command untuk inisialisasi project
		program
			.command("init")
			.description("Inisialisasi project baru")
			.action((options: { name: string; version: string; author: string }) => {
				const config = {
					name: "mama",
					version: pkg.version,
					author: "wahyu agus arifin",
					dir: {
						components: "src/mama/components",
						hooks: "src/mama/hooks",
					},
				};

				const filePath = path.join(process.cwd(), "mama.json");
				mamaConfigCreate(filePath, config);
			});

		// Parse arguments
		program.parse(process.argv);

		// Tampilkan help jika tidak ada argument
		if (!process.argv.slice(2).length) {
			program.help(); // Gunakan program.help() daripada outputHelp
		}
	} catch (error) {
		if (error instanceof Error) {
			handleError(error);
		}
	}
}

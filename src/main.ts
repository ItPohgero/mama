import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import pkg from '../package.json' assert { type: 'json' };

const displayBanner = () => {
    console.log(
        chalk.blue(
            figlet.textSync('Wahyu CLI', { horizontalLayout: 'full' })
        )
    );
};

const handleError = (error: Error) => {
    console.error(chalk.red('Error:', error.message));
    process.exit(1);
};

export function run() {
    try {
        const program = new Command();

        // Display banner
        displayBanner();

        // Set version dan deskripsi
        program
            .name('wahyu')
            .description(chalk.yellow('🚀 Tool untuk mempercepat development'))
            .version(pkg.version, '-v, --version', 'Menampilkan versi CLI')
            .showHelpAfterError(chalk.red('(Gunakan --help untuk informasi lebih lanjut)'))
            .addHelpCommand('help [command]', 'Menampilkan bantuan untuk perintah')
            .helpOption('-h, --help', 'Menampilkan bantuan untuk perintah');

        // Command hello dengan opsi tambahan
        program
            .command('hello')
            .description('Menampilkan pesan sapaan')
            .option('-n, --name <name>', 'Nama yang akan disapa', 'Dunia')
            .option('-c, --color <color>', 'Warna teks (red/green/blue)', 'blue')
            .action((options: { name: string; color: 'red' | 'green' | 'blue' }) => {
                const colors = {
                    red: chalk.red,
                    green: chalk.green,
                    blue: chalk.blue
                };
                const colorize = colors[options.color] || colors.blue;
                console.log(colorize(`👋 Halo, ${options.name}!`));
            });

        // Command generate untuk membuat file/template
        program
            .command('generate')
            .alias('g')
            .description('Generate komponen atau file')
            .argument('<type>', 'Tipe yang akan digenerate (component/model/controller)')
            .argument('<name>', 'Nama file yang akan digenerate')
            .option('-d, --directory <directory>', 'Directory tujuan', './')
            .action((type, name, options) => {
                console.log(chalk.green(`✨ Generating ${type}: ${name}`));
                console.log(chalk.gray(`   Directory: ${options.directory}`));
                // Implementasi generate file bisa ditambahkan di sini
            });

        // Command untuk inisialisasi project
        program
            .command('init')
            .description('Inisialisasi project baru')
            .option('-t, --template <template>', 'Template project', 'default')
            .action((options) => {
                console.log(chalk.green(`🎉 Membuat project baru dengan template: ${options.template}`));
                // Implementasi init project bisa ditambahkan di sini
            });

        // Parse arguments
        program.parse(process.argv);

        // Tampilkan help jika tidak ada argument
        if (!process.argv.slice(2).length) {
            program.outputHelp((text) => chalk.yellow(text));
        }
    } catch (error: any) {
        handleError(error);
    }
}

// Export additional utility functions yang bisa digunakan di file lain
export const utils = {
    displayBanner,
    handleError
};
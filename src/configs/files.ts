import path from "node:path";

const Files = {
    Config: ".mama.yaml", // Changed from .json to .yaml
    Target: ({
        name,
        finalDir,
        format,
    }: {
        name: string;
        finalDir: string;
        format: string;
    }): string => path.join(process.cwd(), finalDir, `${name}.${format}`),
};

export default Files;
import path from "node:path";
import type { TypeOptions } from "@/configs/types";
import type { ProjectChoice, TemplateConfig } from "@/types/create.types";

export const TEMPLATES: Record<TypeOptions, TemplateConfig> = {
	next: {
		path: path.join(__dirname, "../../template/next/create"),
		installCommand: "bun install",
		startCommand: "bun run dev",
	},
	angular: {
		path: path.join(__dirname, "../../template/angular/create"),
		installCommand: "bun install",
		startCommand: "bun run dev",
	},
} as const;

export const PROJECT_CHOICES: readonly ProjectChoice[] = [
	{
		name: "NextJs",
		value: "next",
	},
	{
		name: "Angular",
		value: "angular",
	},
] as const;

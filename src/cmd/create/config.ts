import path from "node:path";
import type { TypeOptions } from "@/configs/types";
import type { ProjectChoice, TemplateConfig } from "@/types/create.types";

export const TEMPLATES: Record<TypeOptions, TemplateConfig> = {
	next: {
		path: path.join(__dirname, "../template/next/create"),
		installCommand: "bun install",
		startCommand: "bun run dev",
	},
} as const;

export const PROJECT_CHOICES: readonly ProjectChoice[] = [
	{
		name: "NextJs",
		value: "next",
	},
] as const;

import type { TypeOptions } from "@/configs/types";
import type { ProjectChoice, TemplateConfig } from "@/types/create.types";

export const TEMPLATES: Record<TypeOptions, TemplateConfig> = {
	next: {
		repo: "https://github.com/dev-mataraman/mama-nextjs-fullstack.git",
		installCommand: "bun install",
		startCommand: "bun run dev",
	},
	angular: {
		repo: "https://github.com/dev-mataraman/mama-nextjs-fullstack.git",
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

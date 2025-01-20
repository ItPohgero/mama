import type { TypeOptions } from "@/configs/types";

export interface TemplateConfig {
	readonly repo: string;
	readonly installCommand: string;
	readonly startCommand: string;
	readonly mama: string;
}

export interface ProjectChoice {
	readonly name: string;
	readonly value: TypeOptions;
}

export interface PromptResult {
	readonly TypeOptions: TypeOptions;
}

export interface PackageJson {
	name: string;
	[key: string]: unknown;
}

import type { TypeOptions } from "@/configs/types";

export interface Config {
	type?: string;
	[key: string]: unknown;
}

export interface ValidationResult {
	message: string;
	isValid: boolean;
	type: TypeOptions | null;
}

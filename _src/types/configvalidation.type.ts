import type { TypeOptions } from "@/configs/type";

export interface Config {
	type?: string;
	[key: string]: unknown;
}

export interface ValidationResult {
	message: string;
	isValid: boolean;
	type: TypeOptions | null;
}

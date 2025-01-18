export type GroupedCommands = {
	group: string;
	commands: {
		cmd: string;
		desc: string;
		arguments?: {
			key: string;
			required: boolean;
			default: string | null;
			description: string;
		}[];
		action: (...args: string[]) => Promise<void>;
	}[];
};

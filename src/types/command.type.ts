export type GroupedCommands = {
	group: string;
	commands: {
		cmd: string;
		desc: string;
		arguments?: {
			key: string;
			required: boolean;
			default: string;
			description: string;
		}[];
		action: () => Promise<void>;
	}[];
};

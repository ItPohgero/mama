type WordingType = {
	mama: {
		version: string;
		showHelpAfterError: string;
		helpOption: string;
	};
	init: {
		description: string;
	};
	create: {
		description: string;
		argument: {
			name: string;
		};
	};
};

export type { WordingType };

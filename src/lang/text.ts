const text = {
	mama: {
		version: "Show version number",
		showHelpAfterError: "(Use --help for more information)",
		helpOption: "Display help for commands",
	},
	init: {
		description:
			"Initialize for existing project <type> application default next",
	},
	create: {
		description: "Create a new application project",
		argument: {
			name: "Name of the application",
		},
	},
	gen: {
		components_desc: "Generate components for your application",
	},
	make: {
		screen_desc: "Manage and design main application views",
		layout_desc: "Define consistent app interface structure",
		hook_desc: "Use React state and lifecycle features",
		api_desc: "Backend communication via API abstraction",
		call_desc: "Fetch or send data via functions",
		shared_desc: "Global state using Redux Toolkit",
	},
};

type TypeText = typeof text;

export type { TypeText };
export default text;

import { useCommands } from "@/hooks/use_commands";
import text from "@/lang/text";
import type { GroupedCommands } from "@/types/command.type";
import type { Command } from "commander";
import { GenComponents } from "./gen/gen:components";
import { MakeCall } from "./make/make:call";
import { MakeController } from "./make/make:controller";
import { MakeHooks } from "./make/make:hooks";
import { MakeLayout } from "./make/make:layout";
import { MakeScreen } from "./make/make:screen";

const groupedCommands: GroupedCommands[] = [
	{
		group: "make",
		commands: [
			{
				cmd: "make:screen",
				arguments: [
					{
						key: "name",
						required: false,
						default: null,
						description: "Name of the screen",
					},
				],
				desc: text.make.screen_desc,
				action: MakeScreen,
			},
			{
				cmd: "make:hooks",
				desc: text.make.hook_desc,
				action: MakeHooks,
				arguments: [
					{
						key: "name",
						required: false,
						default: null,
						description: "Name of the hook",
					},
				],
			},
			{
				cmd: "make:layout",
				desc: text.make.layout_desc,
				action: MakeLayout,
				arguments: [
					{
						key: "name",
						required: false,
						default: null,
						description: "Name of the layout",
					},
				],
			},
			{
				cmd: "make:controller",
				desc: text.make.controller_desc,
				action: MakeController,
				arguments: [
					{
						key: "name",
						required: false,
						default: null,
						description: "Name of the controller",
					},
				],
			},
			{
				cmd: "make:call",
				desc: text.make.call_desc,
				action: MakeCall,
			},
			{
				cmd: "make:shared",
				desc: text.make.shared_desc,
				action: async () => {},
			},
		],
	},
	{
		group: "gen",
		commands: [
			{
				cmd: "gen:components",
				desc: text.gen.components_desc,
				action: GenComponents,
			},
			{
				cmd: "gen:hooks",
				desc: text.gen.hooks_desc,
				action: async () => {},
			},
		],
	},
];

export const CommandsNext = (program: Command) =>
	useCommands(program, groupedCommands);

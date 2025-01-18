import { useCommands } from "@/hooks/use_commands";
import text from "@/lang/text";
import type { GroupedCommands } from "@/types/command.type";
import type { Command } from "commander";
import { GenComponents } from "./gen/gen:components";
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
				desc: text.make.screen_desc,
				action: MakeScreen,
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
		],
	},
];

export const CommandsNext = (program: Command) =>
	useCommands(program, groupedCommands);

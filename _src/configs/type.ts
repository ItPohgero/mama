const TypeOptionsData = [
	"next",
	"next_fullstack",
	"bun_hono",
	"flutter",
	"golang",
] as const;

type TypeOptions = (typeof TypeOptionsData)[number];
export type { TypeOptions };
export { TypeOptionsData };

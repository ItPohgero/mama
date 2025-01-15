const TypeOptionsData = [
	"next",
	"next-fullstack",
	"bun-hono",
	"flutter",
	"golang",
] as const;

type TypeOptions = (typeof TypeOptionsData)[number];
export type { TypeOptions };
export { TypeOptionsData };

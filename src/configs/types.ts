const TypeOptionsData = ["next", "angular"] as const;

type TypeOptions = (typeof TypeOptionsData)[number];
export type { TypeOptions };
export { TypeOptionsData };

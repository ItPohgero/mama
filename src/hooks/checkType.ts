type TypeOptions = "next" | "next-fullstack" | "bun-hono" | "flutter";

const VALID_TYPES: TypeOptions[] = ["next", "next-fullstack", "bun-hono", "flutter"];

const CheckType = (type: string): type is TypeOptions => {
    return VALID_TYPES.includes(type as TypeOptions);
};

export type { TypeOptions }
export { VALID_TYPES, CheckType }
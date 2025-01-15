import { type TypeOptions, TypeOptionsData } from "../configs/type";

const useCheckType = (type: string): type is TypeOptions => {
	return TypeOptionsData.includes(type as TypeOptions);
};
export { useCheckType };

const CapitalizeFirstLetter = (string: string): string => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const ProcessName = (name: string): string => {
	return CapitalizeFirstLetter(
		name
			.replace(/[^a-zA-Z\s]/g, "") // Remove non-alphanumeric characters
			.replace(/\s+/g, "") // Remove spaces
			.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number) =>
				index === 0 ? match.toLowerCase() : match.toLowerCase(),
			),
	);
};

export { CapitalizeFirstLetter, ProcessName };

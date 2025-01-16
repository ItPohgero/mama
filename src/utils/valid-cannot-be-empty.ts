/**
 * Validates the screen name input
 * @param input - The user input string
 * @returns boolean | string - True if valid, error message if invalid
 */
export const validCannotBeEmpty = (input: string): boolean | string => {
	if (!input.trim()) {
		return "Cannot be empty";
	}
	return true;
};

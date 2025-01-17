interface BaseError {
	message: string;
	code?: string;
	path?: (string | number)[];
}

interface InvalidTypeError extends BaseError {
	code: "invalid_type";
	expected: string;
	received: string;
}

interface UnrecognizedKeysError extends BaseError {
	code: "unrecognized_keys";
	keys: string[];
}

interface RequiredError extends BaseError {
	code: "required";
}

type DetailedError =
	| InvalidTypeError
	| UnrecognizedKeysError
	| RequiredError
	| BaseError;

type ErrorResponse =
	| { error: string }
	| { status: string; message: string }
	| {
			status: string;
			message: DetailedError | DetailedError[];
	  };

function extractErrorMessage(error: DetailedError | DetailedError[]): string {
	// Handle array of errors
	if (Array.isArray(error)) {
		return error.map(extractSingleErrorMessage).join("; ");
	}
	return extractSingleErrorMessage(error);
}

function extractSingleErrorMessage(error: DetailedError): string {
	switch (error.code) {
		case "unrecognized_keys": {
			const unrecognizedError = error as UnrecognizedKeysError;
			return `Unrecognized keys: ${unrecognizedError.keys.join(", ")}${error.path ? ` at path ${error.path.join(".")}` : ""}`;
		}

		case "invalid_type": {
			const invalidTypeError = error as InvalidTypeError;
			return `Invalid type: expected ${invalidTypeError.expected}, received ${invalidTypeError.received}${error.path ? ` at path ${error.path.join(".")}` : ""}`;
		}

		case "required":
			return `Required field missing${error.path ? ` at path ${error.path.join(".")}` : ""}`;

		default:
			return error.message;
	}
}

function OnError(err: ErrorResponse): string {
	return "message" in err
		? typeof err.message === "string"
			? err.message
			: extractErrorMessage(err.message)
		: "error" in err
			? err.error
			: "Unknown error occurred";
}

export { OnError };
export type { ErrorResponse };

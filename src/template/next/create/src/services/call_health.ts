import { ApiClient } from "@/server/clients/hono.client";
import { OnError, type ErrorResponse } from "@/utils/asert_error";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
	try {
		const client = await ApiClient();
		const r = await client.api.main.health.$get();
		if (!r.ok) {
			const err: ErrorResponse = await r.json();
			const error = OnError(err);
			throw new Error(`Ups : ${error}`);
		}
		const data = await r.json();
		return data.results;
	} catch (error) {
		const er = error instanceof Error ? error.message : String(error);
		throw new Error(er);
	}
};
const CallHealth = () => {
	return useQuery({
		queryKey: ["health"],
		queryFn,
		retry: 1,
	});
};

export default CallHealth;

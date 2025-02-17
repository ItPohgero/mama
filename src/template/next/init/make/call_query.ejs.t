/**
 * @author <%= author %>
 * @generated at <%= createdAt %>
 * This file is generated by Mama CLI
 */

import { ApiClient } from "@/server/clients/hono.client";
import { OnError, type ErrorResponse } from "@/utils/asert_error";
import { useQuery } from "@tanstack/react-query";

const queryFn = async () => {
	try {
		const client = await ApiClient();
		const r = await client.api.ex.$get();
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
const Call<%= name %> = () => {
	return useQuery({
		queryKey: ["<%= name %>"],
		queryFn,
		retry: 1,
	});
};

export default Call<%= name %>;


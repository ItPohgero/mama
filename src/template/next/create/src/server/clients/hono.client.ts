import type { AppType } from "@/app/api/[[...route]]/route";
import { ENV } from "@/configs/environment";
import { getCookies } from "@/hooks/use_cookies";
import { hc } from "hono/client";

const getBaseUrl = () =>
	typeof window !== "undefined"
		? `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ""}`
		: ENV.BASE_URL || "http://localhost:8084";

export async function ApiClient({
	isMultipart = false,
}: { isMultipart?: boolean } = {}) {
	const token = await getCookies(ENV.KEY_TOKEN);

	return hc<AppType>(getBaseUrl(), {
		headers: {
			"Content-Type": isMultipart ? "multipart/form-data" : "application/json",
			...(token && { Authorization: `Bearer ${token.value}` }),
		},
	});
}

export default ApiClient;

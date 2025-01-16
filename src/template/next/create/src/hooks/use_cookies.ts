"use server";

import { ENV } from "@/configs/environment";
import { cookies } from "next/headers";

type NameCookies = typeof ENV.KEY_TOKEN | "refresh_token" | "location";
interface CookiesProps {
	name: NameCookies;
	data: string;
}

export async function createCookies(props: CookiesProps) {
	(await cookies()).set(props?.name, props?.data, { secure: true });
}

export async function getCookies(name: CookiesProps["name"]) {
	return (await cookies()).get(name);
}

export async function removeCookies(name: CookiesProps["name"]) {
	(await cookies()).delete(name);
}

export async function removeAllCookies() {
	const cookieStore = await cookies();
	const token = ENV.KEY_TOKEN;
	const cookieNames: NameCookies[] = [token, "refresh_token"];

	for (const name of cookieNames) {
		cookieStore.delete(name);
	}
}

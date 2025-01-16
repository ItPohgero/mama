"use client";
import { Provider } from "react-redux";
import { store } from "../shared/store";

export function ProviderReduxToolkit({
	children,
}: { children: React.ReactNode }) {
	return <Provider store={store}>{children}</Provider>;
}

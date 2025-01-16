"use client";
import { usePreventDevTools } from "@/hooks/use_devtool";
import { type FC, Fragment, type PropsWithChildren } from "react";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
	usePreventDevTools();
	return (
		<Fragment>
			<main>{children}</main>
		</Fragment>
	);
};

export default AppLayout;

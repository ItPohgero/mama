'use client';
import CallHealth from "@/services/call_health";
import React from "react";
import { If } from "react-if";

const ScreenMain = () => {
	const { data, isLoading, refetch } = CallHealth();
	return (
		<div>
			<h1>Screen Main</h1>
			<button type="button" onClick={() => refetch()}>Refetch</button>
			<If condition={isLoading}>
				<div>Loading...</div>
			</If>
			<If condition={!isLoading}>
				<div>{JSON.stringify(data)}</div>
			</If>
		</div>
	);
};

export default ScreenMain;

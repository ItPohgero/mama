"use client";

import { ENV } from "@/configs/environment";
import { useEffect } from "react";

export function disableDevTools(): () => void {
	if (typeof window !== "undefined") {
		// Prevent zooming via keyboard or touch
		const preventZoom = (e: WheelEvent | TouchEvent): void => {
			if ("ctrlKey" in e && (e as WheelEvent).ctrlKey) {
				e.preventDefault();
			}
			if (e.type === "touchmove" && (e as TouchEvent).touches.length > 1) {
				e.preventDefault();
			}
		};

		// Block developer tools shortcut keys and context menu
		const preventDevTools = (e: KeyboardEvent | MouseEvent): void => {
			if (e.type === "keydown") {
				const keyEvent = e as KeyboardEvent;
				if (
					keyEvent.key === "F12" ||
					(keyEvent.ctrlKey &&
						keyEvent.shiftKey &&
						["I", "J", "C"].includes(keyEvent.key)) ||
					(keyEvent.ctrlKey && keyEvent.key === "U")
				) {
					keyEvent.preventDefault();
				}
			}
			if (e.type === "contextmenu") {
				e.preventDefault();
			}
		};

		// Shadow `console` using Proxy
		const shadowConsole = new Proxy(console, {
			get: () => () => {
				/* No-op (silence all console methods) */
			},
			set: () => false,
		});

		Object.assign(window, { console: shadowConsole });

		// Attach event listeners
		window.addEventListener("wheel", preventZoom, { passive: false });
		window.addEventListener("touchmove", preventZoom, { passive: false });
		window.addEventListener("keydown", preventDevTools);
		window.addEventListener("contextmenu", preventDevTools);

		// Cleanup function
		return () => {
			window.removeEventListener("wheel", preventZoom);
			window.removeEventListener("touchmove", preventZoom);
			window.removeEventListener("keydown", preventDevTools);
			window.removeEventListener("contextmenu", preventDevTools);
		};
	}

	return () => {
		/* No-op for non-browser environments */
	};
}

export function usePreventDevTools(): void {
	useEffect(() => {
		if (ENV.NODE_ENV === "production") {
			const cleanup = disableDevTools();
			return cleanup;
		}
	}, []);
}

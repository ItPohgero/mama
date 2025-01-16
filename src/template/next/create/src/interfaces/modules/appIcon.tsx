"use client";
import { Icon } from "@iconify/react";
import type React from "react";
import { twMerge } from "tailwind-merge";

export const ICON_CONFIG = {
	loading: "svg-spinners:90-ring-with-bg",
	home: "solar:home-smile-angle-line-duotone",
	maps: "solar:map-arrow-square-line-duotone",
} as const;

export type IconType = keyof typeof ICON_CONFIG;
export const IconType = Object.keys(ICON_CONFIG) as IconType[];

interface AppIconProps {
	icon: IconType;
	className?: string;
}
const AppIcon: React.FC<AppIconProps> = ({ icon, className = "" }) => {
	const iconPath = ICON_CONFIG[icon];
	return (
		<Icon icon={iconPath} className={twMerge("text-foreground", className)} />
	);
};

export default AppIcon;

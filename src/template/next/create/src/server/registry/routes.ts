import type { AppRoutes } from "@/types/route.types";
import HealthController from "../clients/health.controller";

export const appRoutes: AppRoutes = {
    groups: [
        {
            prefix: "/main",
            routes: [
                {
                    path: "/health",
                    method: "get",
                    handler: HealthController
                }
            ]
        }
        // Add more route groups as needed
    ],
    standalone: [
        // Add standalone routes that don't belong to any group
    ]
};
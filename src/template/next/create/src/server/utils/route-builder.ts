import { Hono } from "hono";
import { AppRoutes, RouteGroup, RouteDefinition } from "@/types/route.types";

export class RouteBuilder {
    private app: Hono;

    constructor(basePath: string = "/api") {
        this.app = new Hono().basePath(basePath);
    }

    private applyRoute(route: RouteDefinition): void {
        const { method, path, handler, middleware = [] } = route;

        if (middleware.length > 0) {
            this.app[method](path, ...middleware, handler);
        } else {
            this.app[method](path, handler);
        }
    }

    private applyRouteGroup(group: RouteGroup): void {
        const subApp = new Hono();

        group.routes.forEach(route => {
            const { method, path, handler, middleware = [] } = route;
            if (middleware.length > 0) {
                subApp[method](path, ...middleware, handler);
            } else {
                subApp[method](path, handler);
            }
        });

        this.app.route(group.prefix, subApp);
    }

    public buildRoutes(routes: AppRoutes): Hono {
        // Apply grouped routes
        routes.groups.forEach(group => this.applyRouteGroup(group));

        // Apply standalone routes
        routes.standalone.forEach(route => this.applyRoute(route));

        return this.app;
    }
}
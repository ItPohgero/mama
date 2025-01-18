import { Context } from "hono";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface RouteDefinition {
    path: string;
    method: HttpMethod;
    handler: (c: Context) => Promise<Response> | Response;
    middleware?: ((c: Context, next: () => Promise<void>) => Promise<void>)[];
}

export interface RouteGroup {
    prefix: string;
    routes: RouteDefinition[];
}

export interface AppRoutes {
    groups: RouteGroup[];
    standalone: RouteDefinition[];
}

export interface ControllerDefinition {
    name: string;
    routes: RouteDefinition[];
}
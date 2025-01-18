import { handle } from "hono/vercel";
import { RouteBuilder } from "@/server/utils/route-builder";
import { appRoutes } from "@/server/registry/routes";

const routeBuilder = new RouteBuilder("/api");
const app = routeBuilder.buildRoutes(appRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
export const PATCH = handle(app);
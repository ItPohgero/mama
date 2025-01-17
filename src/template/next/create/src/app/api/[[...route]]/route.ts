import HealthController from "@/server/clients/health.controller";
import { Hono } from "hono";
import { handle } from "hono/vercel";

const main = new Hono().get("/health", HealthController);

const app = new Hono()
	.basePath("/api")
	.route("/main", main)

export const GET = handle(app);
export const POST = handle(app);
export type AppType = typeof app;

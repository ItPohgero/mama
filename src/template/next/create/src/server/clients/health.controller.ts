import type { Context } from "hono";
import HealthService from "../services/health.service";

const HealthController = async (c: Context) => {
    try {
        const results = await HealthService.check();
        return c.json(
            {
                message: "Success",
                results
            },
            200,
        );
    } catch (error) {
        return c.json(
            {
                message: "Error",
                results: error,
            },
            500,
        );
    }
};

export default HealthController;

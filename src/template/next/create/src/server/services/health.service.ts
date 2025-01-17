
class Main {
	async check() {
		try {
			return {
				status: "Server is running",
				timestamp: new Date().toISOString(),
			};
		} catch (error: unknown) {
			throw new Error(JSON.stringify(error));
		}
	}
}
const HealthService = new Main();
export default HealthService;

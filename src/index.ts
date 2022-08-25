import envConfig from "@config/env";
import { startApollo } from "apollo";
import app from "app";

const startServer = async () => {
	await startApollo(app);

	app.listen(envConfig.express.port, () => {
		console.log(`server listening on port ${envConfig.express.port}`);
	});
};

startServer();

import path from "path";
import { config } from "dotenv";

config({ path: path.resolve(".env") });

const envConfig = {
	express: {
		port: process.env.EXPRESS_PORT,
	},
};

export default envConfig;

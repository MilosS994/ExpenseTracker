import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, MONGO_URI, NODE_ENV } = process.env;

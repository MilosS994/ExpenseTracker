import { config } from "dotenv";

config({ path: ".env" });

export const { PORT, MONGO_URI, NODE_ENV, JWT_SECRET } = process.env;

import express from "express";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes.apiRouter);
app.use("/auth", routes.authRouter);

export default app;

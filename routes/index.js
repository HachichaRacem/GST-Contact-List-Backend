import { Router } from "express";
import regionsRoutes from "./regionsRoutes.js";
import termsRoutes from "./termsRoutes.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";

const apiRouter = Router();
const authRouter = Router();

apiRouter.use("/regions", regionsRoutes);
apiRouter.use("/terms", termsRoutes);
apiRouter.use("/user", userRoutes);

authRouter.use("/", authRoutes);

export default { apiRouter, authRouter };

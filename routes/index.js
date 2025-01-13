import { Router } from "express";
import regionsRoutes from "./regionsRoutes.js";
import termsRoutes from "./termsRoutes.js";
import userRoutes from "./userRoutes.js";

const apiRouter = Router();

apiRouter.use("/regions", regionsRoutes);
apiRouter.use("/terms", termsRoutes);
apiRouter.use("/user", userRoutes);

export default { apiRouter };

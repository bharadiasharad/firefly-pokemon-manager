import { Router } from "express";

import authRouter from "./authRoute";
import docsRouter from "./docsRoute";
import pokemonRouter from "./pokemonRoutes";

const router = Router();

router.use("/auth", authRouter);
router.use("/docs", docsRouter);
router.use("/pokemon", pokemonRouter);

export default router;

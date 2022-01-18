import { Router } from "express";

import clientRouter from "@/routers/client";

const router = Router();

router.use("/", clientRouter);

export default router;

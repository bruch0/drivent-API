import { Router } from "express";

import * as controller from "@/controllers/client/event";

const router = Router();

router.get("/", controller.get);

export default router;

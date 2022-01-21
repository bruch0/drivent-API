import { Router } from "express";

import * as controller from "@/controllers/client/payment";

const router = Router();

router.get("/", controller.getPaymentByUserId);

export default router;

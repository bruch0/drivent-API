import { Router } from "express";

import * as controller from "@/controllers/client/payment";

const router = Router();

router.get("/payments", controller.getPaymentData);
router.get("/teste", (req, res) => console.log('teste'));
router.post("/payments", controller.savePaymentData);

export default router;
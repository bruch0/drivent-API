import { Router } from "express";

import * as controller from "@/controllers/client/certificate";

const router = Router();

router.get("/:userId", controller.getUserCertificateInfo);

export default router;

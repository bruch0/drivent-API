import { Router } from "express";

import * as controller from "@/controllers/client/enrollment";

import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import enrollmentSchema from "@/schemas/enrollmentSchema";

const router = Router();

router.post("/", schemaValidatingMiddleware(enrollmentSchema), controller.saveEnrollmentInfo);
router.get("/", controller.getEnrollmentInfos);

export default router;

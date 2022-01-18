import { Router } from "express";

import * as controller from "@/controllers/client/auth";
import schemaValidatingMiddleware from "@/middlewares/schemaValidatingMiddleware";

import signInSchema from "@/schemas/signInSchema";

const router = Router();

router.post("/sign-in", schemaValidatingMiddleware(signInSchema), controller.signIn);

export default router;

import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/dates", controller.getActivitiesDateInfo);

export default router;

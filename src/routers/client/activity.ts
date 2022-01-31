import { Router } from "express";

import * as controller from "@/controllers/client/activity";

const router = Router();

router.get("/dates", controller.getActivitiesDateInfo);
router.post("/subscribe", controller.postNewActivity);
router.get("/activities", controller.getActivitiesByDay);

export default router;
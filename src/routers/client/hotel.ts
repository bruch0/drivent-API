import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/bookings/:hotelId", controller.getRooms);

export default router;

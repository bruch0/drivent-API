import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.getUserHotelInfo);
router.get("/bookings/:hotelId", controller.getHotelRoomsInfo);

export default router;

import { Router } from "express";

import * as controller from "@/controllers/client/hotel";

const router = Router();

router.get("/", controller.getUserHotelInfo);
router.get("/list", controller.getHotelsList);
router.get("/bookings/:hotelId", controller.getHotelRoomsInfo);
router.post("/bookings", controller.saveBooking);

export default router;

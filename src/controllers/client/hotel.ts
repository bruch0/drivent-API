import { Request, Response } from "express";

import * as service from "@/services/client/hotel";

export async function getRooms(req: Request, res: Response) {
  const hotelId = Number(req.params.hotelId);
  const rooms = await service.getRoomsInfo(hotelId);
  res.send(rooms);
}

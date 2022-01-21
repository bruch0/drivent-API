import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";

export async function getHotelInfo(req: Request, res: Response) {
  const hotelInfo = await hotelService.getHotelsInfo(req.user.id);

  if (!hotelInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(hotelInfo).status(httpStatus.OK);
}

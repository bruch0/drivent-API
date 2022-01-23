import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";
import HotelDTO from "@/interfaces/hotelDTO";

export async function getUserHotelInfo(req: Request, res: Response) {
  const hotelInfo = await hotelService.getHotelsInfo(req.user.id);

  if (!hotelInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(hotelInfo).status(httpStatus.OK);
}

export async function getHotelRoomsInfo(req: Request, res: Response) {
  const hotelId = Number(req.params.hotelId);
  const rooms = await hotelService.getRoomsInfo(hotelId);

  if (!rooms) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(rooms).status(httpStatus.OK);
}

export async function getHotelsList(req: Request, res: Response) {
  const hotels = await hotelService.getHotelsList();

  if (!hotels) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  //prettier-ignore
  await Promise.all(hotels.map(async(h) => h.vacancy = await hotelService.getHotelVacancy(h.id)));
  res.send(hotels).status(httpStatus.OK);
}

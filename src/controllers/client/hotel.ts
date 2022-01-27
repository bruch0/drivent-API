import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/hotel";

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

export async function saveBooking(req: Request, res: Response) {
  const  userId  = req.user.id;
  const { hotel, room } = req.body;

  const affected = await hotelService.saveBookingData( userId, hotel, room );
  if (affected === 0) return res.sendStatus(httpStatus.NO_CONTENT);
  
  return res.sendStatus(httpStatus.CREATED);
}

export async function getBooking(req: Request, res: Response) {
  const userId  = req.user.id;
  const booking = await hotelService.getBookingByUser(userId);
  if (!booking) res.sendStatus(404);
  return res.status(200).send(booking);
}

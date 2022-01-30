import { Request, Response } from "express";
import httpStatus from "http-status";

import * as hotelService from "@/services/client/activity";

export async function getActivitiesDateInfo(req: Request, res: Response) {
  const dates = await hotelService.getActivitiesDate();

  if (!dates) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(dates).status(httpStatus.OK);
}

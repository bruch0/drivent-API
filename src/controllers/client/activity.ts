import { Request, Response } from "express";
import httpStatus from "http-status";

import * as activityService from "@/services/client/activity";

export async function getActivitiesDateInfo(req: Request, res: Response) {
  const dates = await activityService.getActivitiesDate();

  if (!dates) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(dates).status(httpStatus.OK);
}

export async function postNewActivity(req: Request, res: Response) {
  const { activity, user } = req.body;
  await activityService.postActivity(activity, user);
  return res.sendStatus(200);
}

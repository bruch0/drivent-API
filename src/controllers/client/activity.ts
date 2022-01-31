import { Request, Response } from "express";
import httpStatus from "http-status";

import * as activitiesService from "@/services/client/activity";

async function getActivitiesDateInfo(req: Request, res: Response) {
  const dates = await activitiesService.getActivitiesDate();

  if (!dates) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(dates).status(httpStatus.OK);
}

async function getActivitiesByDay(req: Request, res: Response) {
  const time1 = req.header("Time1");
  const time2 = req.header("Time2");
  const activities1 = await activitiesService.getActivitiesByDay(time1);
  const activities2 = await activitiesService.getActivitiesByDay(time2);

  const activities = activities1.concat(activities2);

  if (!activities) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.send(activities).status(httpStatus.OK);
}

export{
  getActivitiesDateInfo,
  getActivitiesByDay,
};

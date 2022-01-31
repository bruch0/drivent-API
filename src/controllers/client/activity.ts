import { Request, Response } from "express";
import httpStatus from "http-status";
import dayjs from "dayjs";

import * as activityService from "@/services/client/activity";

export async function getActivitiesDateInfo(req: Request, res: Response) {
  const dates = await activityService.getActivitiesDate();

  if (!dates) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  res.status(httpStatus.OK).send(dates);
}

export async function postNewActivity(req: Request, res: Response) {
  const  userId  = req.user.id;
  const { activityId } = req.body;

  const [activity] = await activityService.getActivityById(activityId);
  const { duration, time } = activity;
  
  const userActivities = await activityService.getUserActivities(userId);
  const timeConflict = userActivities.find((activity) => {
    //se o dia for igual e a hora for igual
    if (activity.time === time) return true;
    //se a atividade a ser cadastrada durar mais de uma hora e a atividade já cadastrada começar em uma dessas horas seguintes
    if (duration > 1 && dayjs(activity.time) === dayjs(time).add(duration - 1, "hour")) return true;
    //se a atividade já cadastrada durar mais de uma hora e a atividade a ser cadastrada começar em uma dessas horas seguintes
    if (activity.duration > 1 && dayjs(activity.time) === dayjs(time).subtract(activity.duration - 1, "hour")) return true;
  });

  if (timeConflict) return res.sendStatus(409);

  await activityService.postActivity(activityId, userId);
  return res.sendStatus(201);
}

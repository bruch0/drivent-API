import Activity from "@/entities/Activity";

export async function getActivitiesDate() {
  const dates = await Activity.getDates();
  return dates;
}

export async function getActivityById(activityId: number) {
  const activity = await Activity.getActivity(activityId);
  return activity;
}

export async function getUserActivities(userId: number) {
  const userActivities = await Activity.getUserActivities(userId);
  return userActivities;
}

export async function postActivity(activityId: number, userId: number) {
  return Activity.subscribe(activityId, userId);
}

export async function getActivitiesByDay(time: string) {
  const activities = await Activity.findActivitiesByDate(time);
  return activities;
}


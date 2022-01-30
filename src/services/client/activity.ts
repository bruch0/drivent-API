import Activity from "@/entities/Activity";

export async function getActivitiesDate() {
  const dates = await Activity.getDates();
  return dates;
}
export async function postActivity(activityId: number, userId: number) {
  return await Activity.subscribe(activityId, userId);
}


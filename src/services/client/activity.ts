import Activity from "@/entities/Activity";

export async function getActivitiesDate() {
  const dates = await Activity.getDates();
  return dates;
}

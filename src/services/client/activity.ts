import Activity from "@/entities/Activity";

async function getActivitiesDate() {
  const dates = await Activity.getDates();
  return dates;
}

async function getActivitiesByDay(time: string) {
  const activities = await Activity.findActivitiesByDate(time);
  return activities;
}

export{
  getActivitiesDate,
  getActivitiesByDay,
};

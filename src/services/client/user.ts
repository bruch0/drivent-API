import dayjs from "dayjs";
import User from "@/entities/User";

import CannotEnrollBeforeStartDateError from "@/errors/CannotEnrollBeforeStartDate";
import Setting from "@/entities/Setting";

export async function createNewUser(email: string, password: string) {
  const settings = await Setting.getEventSettings();

  if (dayjs().isBefore(dayjs(settings.startDate))) {
    throw new CannotEnrollBeforeStartDateError();
  }

  const user = await User.createNew(email, password);
  return user;
}

import Setting from "@/entities/Setting";

export async function getEventInfo() {
  return await Setting.getEventSettings();
}

import Enrollment from "@/entities/Enrollment";
import Hotel from "@/entities/Hotel";

export async function getHotelsInfos(userId: number) {
  const enrollment =  await Enrollment.getByUserIdWithAddress(userId);
  return enrollment
}
import Enrollment from "@/entities/Enrollment";
import Hotel from "@/entities/Hotel";
import Payment from "@/entities/Payment";

export async function getHotelsInfo(userId: number) {
  const enrollment =  await Enrollment.getByUserIdWithAddress(userId);
  return enrollment
  //TO-DO tem que ver se tem um hotel registrado no nome da pesssoa
}
import Enrollment from "@/entities/Enrollment";
import Hotel from "@/entities/Hotel";
import HotelDTO from "@/interfaces/hotelDTO";

export async function getHotelsInfo(userId: number) {
  const enrollment = await Enrollment.getByUserIdWithAddress(userId);
  return enrollment;
}

export async function getRoomsInfo(hotelId: number) {
  return await Hotel.getRooms(hotelId);
}

export async function getHotelsList(): Promise<HotelDTO[]> {
  return Hotel.getAll();
}

export async function getHotelVacancy(hotelId: number) {
  const result = (await Hotel.getVacancy(hotelId)).availableRooms;
  return result;
}

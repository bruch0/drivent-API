import Hotel from "@/entities/Hotel";

export async function getRoomsInfo(hotelId: number) {
  return await Hotel.getRooms(hotelId);
}

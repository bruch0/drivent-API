import Booking from "@/entities/Booking";

export async function getRoomsInfo(hotelId: number) {
  return await Booking.get(hotelId);
}

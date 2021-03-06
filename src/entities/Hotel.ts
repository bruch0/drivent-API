import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Booking from "./Booking";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  roomTypes: string;

  @Column()
  imageUrl: string;

  @OneToMany(() => Booking, (booking) => booking.hotel)
  bookings: Booking[];

  static async checkHotel(hotelId: number) {
    return await this.findOne(hotelId);
  }

  static async getRooms(hotelId: number) {
    const result = await this.createQueryBuilder("hotel")
      .select("booking.roomNumber", "roomNumber")
      .addSelect("SUM(CASE WHEN booking.isTaken = FALSE THEN 1 ELSE 0 END)::INTEGER", "available")
      .addSelect("SUM(CASE WHEN booking.isTaken = TRUE THEN 1 ELSE 0 END)::INTEGER", "unavailable")
      .leftJoin("hotel.bookings", "booking")
      .where({ id: hotelId })
      .groupBy("booking.roomNumber")
      .execute();
    return result;
  }

  static async getAll() {
    return this.find();
  }

  static async getVacancy(hotelId: number) {
    const result = await this.createQueryBuilder("hotel")
      .select("SUM(CASE WHEN booking.isTaken = FALSE THEN 1 ELSE 0 END)::INTEGER", "availableRooms")
      .leftJoin("hotel.bookings", "booking")
      .where({ id: hotelId })
      .getRawOne();
    return result;
  }
}

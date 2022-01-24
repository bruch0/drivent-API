import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  getConnection,
} from "typeorm";
import Hotel from "./Hotel";
import User from "./User";

@Entity("bookings")
export default class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomNumber: number;

  @Column()
  isTaken: boolean;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
  hotel: Hotel;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  static async bookTheRoom(bookingId: number, userId: number) {    
    await this.relateBookingToUser(bookingId, userId);
    return await this.setBookingStatus(bookingId, true);
  }

  static async freeTheRoom(bookingId: number) {
    await this.relateBookingToUser(bookingId, null);
    return await this.setBookingStatus(bookingId, false);
  }

  static async getReservationDetails(bookingId: number) {
    return await this.findOne(bookingId);
  }

  static async setBookingStatus(bookingId: number, isTaken: boolean) {
    const results = await getConnection()
      .createQueryBuilder()
      .update(Booking)
      .set({
        isTaken        
      })
      .where("id = :id", { id: bookingId })
      .execute();
  
    return results;
  }

  static async relateBookingToUser(bookingId: number, userId: number) {
    await getConnection()
      .createQueryBuilder()
      .relation(Booking, "user")
      .of(bookingId)
      .set(userId);
  }
}

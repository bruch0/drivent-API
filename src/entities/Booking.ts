import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
  getConnection,
  getManager,
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

  static async bookingTheRoom(userId: number, room: number, hotel: number) {
    const [{ id }] = await getManager().query("select bookings.id as id from bookings left join hotels on bookings.\"hotelId\" = hotels.id where bookings.\"roomNumber\" = $1 and bookings.\"isTaken\" = $2 and hotels.id = $3 limit 1;", [room, false, hotel]);
    await this.relateBookingToUser(id, userId);
    const { affected } = await this.setBookingStatus(id, true);
    return affected;
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

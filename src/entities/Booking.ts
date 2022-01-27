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

  @Column()
  hotelId: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.bookings)
  hotel: Hotel;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  static async bookingTheRoom(userId: number, room: number, hotel: number) {
    const [{ id: bookingId }] = await getManager().query(
      `select bookings.id as id 
      from bookings 
      left join hotels on bookings."hotelId" = hotels.id 
      where bookings."roomNumber" = $1 
      and bookings."isTaken" = $2 
      and hotels.id = $3 limit 1;`, 
      [room, false, hotel]);

    await this.relateBookingToUser(bookingId, userId);

    const { affected } = await this.setBookingStatus(bookingId, true);
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

  static async getBookingByUser(userId: number) {
    const [booking] = await this.find({ relations: ["hotel"], where: {
      user: { id: userId }
    } });

    if (!booking) return null;
    const { hotelId, roomNumber } = booking;
    const vacancies = await this.find({
      where: { hotelId, roomNumber }
    });

    const response = {      
      imageUrl: booking.hotel.imageUrl,
      name: booking.hotel.name,
      roomType: vacancies.length,
      roomNumber: vacancies[0].roomNumber,
      confirmedCompanions: vacancies.filter((v) => v.isTaken).length - 1
    };
    return response;
  }  
}


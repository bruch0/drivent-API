import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
import Hotel from "./Hotel";
import User from "./User";

@Entity("bookings")
export default class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  roomNumber: number;

  @Column("boolean", { default: false })
  isTaken: boolean;

  @ManyToOne(() => Hotel, hotel => hotel.bookings)
  hotel: Hotel;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  static async get(hotelId: number) {
    return { hotelId };
  }
}

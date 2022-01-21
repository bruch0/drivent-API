import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne} from "typeorm";
import User from "./User";

@Entity("payments")
export default class Payment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('boolean')
  hotel: boolean;

  @Column('text')
  ticket: string;

  @Column()
  value: number;

  @OneToOne(() => User, { eager: true })
  user: User;

  static async createNew() {
  }

}


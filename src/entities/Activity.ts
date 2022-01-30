import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,  
} from "typeorm";
import User from "./User";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: number;

  @Column()
  locale: string;

  @Column()
  vacancies: number;

  @Column({ type: "timestamp" })
  time: Date;

  @ManyToMany(() => User, user => user.id)
  @JoinTable({
    name: "user_activity",
    joinColumn: { 
      name: "activityId", 
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id"
    }
  })
  users: User[]

  static async getDates() {
    return this.find({ select: ["id", "time"] });
  }

  static async findActivitiesByDate(time: string) {
    return await this.find({ where: { time } });
  }
}
  

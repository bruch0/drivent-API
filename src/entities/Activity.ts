import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  getConnection,  
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

  @ManyToMany(() => User, user => user.id, {
    cascade: true
  })
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

  static async subscribe(activityId: number, userId: number) {
    return await getConnection()
      .createQueryBuilder()
      .relation(Activity, "users")
      .of(activityId)
      .add(userId);
  }
}
  

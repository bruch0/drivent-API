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

  @ManyToMany(() => User, (user) => user.id, {
    cascade: true,
  })
  @JoinTable({
    name: "user_activity",
    joinColumn: {
      name: "activityId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "userId",
      referencedColumnName: "id",
    },
  })
  users: User[];

  static async getDates() {
    return this.find({ select: ["id", "time"] });
  }

  static getActivity(activityId: number) {
    return this.find({ id: activityId });
  }

  static async subscribe(activityId: number, userId: number) {
    return getConnection()
      .createQueryBuilder()
      .relation(Activity, "users")
      .of(activityId)
      .add(userId);
  }

  static async getUserActivities(userId: number) {
    const userActivities = await this.find({
      where: {
        users: { userId },
      },
    });
    return userActivities;
  }

  static async findActivitiesByDate(time: string) {
    console.log("tempO ", time);
    const result = await this.find({ where: { time } });
    console.log(result);
    return result;
  }
}

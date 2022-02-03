import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  getConnection,
  getManager,  
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

  static getActivity(activityId: number) {
    return this.find({ id: activityId });
  }

  static async getActivityStatus({ activityId, userId }: {activityId: number, userId: number}) {
    const activity = await getManager().query("select * from user_activity where \"userId\" = $1 and \"activityId\" = $2;", [userId, activityId]);  
    if (activity.length === 0) {
      return false;
    }
    return true;
  }

  static async subscribe(activityId: number, userId: number) {
    return getConnection()
      .createQueryBuilder()
      .relation(Activity, "users")
      .of(activityId)
      .add(userId);
  }

  static async getUserActivities(userId: number) {
    const userActivities = await getManager().query(`select * from user_activity inner join activities on activities.id = user_activity."activityId" WHERE "userId" = ${userId};`);
    return userActivities;
  }
  
  static async findActivitiesByDate(time: string) {
    return await this.find({ where: { time } });
  }
}
  

import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("settings")
export default class Setting extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  value: string;

  static async getEventSettings() {
    const settings = await this.find();

    const getValue = (name: string) =>
      settings.find((s) => s.name === name).value;

    return {
      startDate: new Date(getValue("start_date")),
      endDate: new Date(getValue("end_date")),
      eventTitle: getValue("event_title"),
      backgroundImage: getValue("background_image"),
      logoImage: getValue("logo_image"),
    };
  }
}

import CpfNotAvailableError from "@/errors/CpfNotAvailable";
import EnrollmentData from "@/interfaces/enrollment";
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  getConnection,
} from "typeorm";
import Address from "@/entities/Address";
import User from "./User";

@Entity("enrollments")
export default class Enrollment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  birthday: string;

  @Column()
  phone: string;

  @Column()
  userId: number;

  @OneToOne(() => Address, (address) => address.enrollment, { eager: true })
  address: Address;

  populateFromData(data: EnrollmentData) {
    this.name = data.name;
    this.cpf = data.cpf;
    this.birthday = data.birthday;
    this.phone = data.phone;
    this.userId = data.userId;

    this.address ||= Address.create();
    const { address } = this;

    address.cep = data.address.cep;
    address.street = data.address.street;
    address.city = data.address.city;
    address.number = data.address.number;
    address.state = data.address.state;
    address.neighborhood = data.address.neighborhood;
    address.addressDetail = data.address.addressDetail;
  }

  static async createOrUpdate(data: EnrollmentData) {
    const user = await getConnection()
      .createQueryBuilder()
      .select("users.id as id")
      .from(User, "users")
      .where(`users.email = '${data.email}'`)
      .execute();

    const userId: number = user[0].id;
    let enrollment = await this.findOne({ where: { userId } });
    if (enrollment && enrollment.userId !== data.userId) {
      throw new CpfNotAvailableError(data.cpf);
    }

    enrollment ||= Enrollment.create();
    const addressId = enrollment.address?.id;
    enrollment.populateFromData(data);
    enrollment.address.id = addressId;

    await enrollment.save();
    enrollment.address.enrollmentId = enrollment.id;
    await enrollment.address.save();
  }

  static async getByUserIdWithAddress(userId: number) {
    return await this.findOne({ where: { userId } });
  }
}

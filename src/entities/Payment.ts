import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import User from './User';

@Entity('payments')
export default class Payment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	hotel: boolean;

	@Column()
	ticket: string;

	@Column()
	value: number;

	@OneToOne(() => User, { eager: true })
	user: User;

	static async findByUserId(userId: number) {
		return await this.findOne({ where: { userId } });
	}
}

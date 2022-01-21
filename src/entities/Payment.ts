import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import User from './User';

@Entity('payments')
export default class Payment extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: false })
	hotel: boolean;

	@Column()
	ticket: string;

	@Column()
	value: number;

	@Column()
	userId: number;

	static async findByUserId(userId: number) {
		return await this.findOne({ where: { userId } });
	}
}

import { MigrationInterface, QueryRunner } from "typeorm";
import { getRandomIntInclusive } from "./utils/getRandomIntInclusive";

export class PopulateDrivenResortBookings1642986701025 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rooms = [101, 102, 103, 104, 105, 106, 201, 202, 203, 204, 205, 206, 301, 302, 303, 304, 305, 306];

    let query = "";
      
    for(let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < getRandomIntInclusive(1, 2); j++ ) {
        query += `(${rooms[i]}, false, 1),`;
      }
    }
      
    query = query.slice(0, -1);
      
    await queryRunner.query(`
        INSERT INTO bookings
        ("roomNumber", "isTaken", "hotelId")
        VALUES ${query}            
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM bookings;  
    `);
  }
}

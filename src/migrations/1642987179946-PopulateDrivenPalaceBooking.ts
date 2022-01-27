import { MigrationInterface, QueryRunner } from "typeorm";
import { getRandomIntInclusive } from "./utils/getRandomIntInclusive";

export class PopulateDrivenPalaceBooking1642987179946 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rooms = [101, 102, 103, 104, 105, 201, 202, 203, 204, 205, 301, 302, 303, 304, 305, 401, 402, 403, 404, 405, 501, 502, 503, 504, 601, 602, 603, 604, 605, 606, 701, 702, 703, 704, 705, 801, 802, 803, 804, 805];

    let query = "";
      
    for(let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < getRandomIntInclusive(1, 3); j++ ) {
        query += `(${rooms[i]}, false, 2),`;
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

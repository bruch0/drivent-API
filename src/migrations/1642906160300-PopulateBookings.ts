import { MigrationInterface, QueryRunner } from "typeorm";

export class PopulateBookings1642906160300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    function getRandomIntInclusive(min: number, max: number): number {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    // function caraOuCoroa() {
    //   return !!getRandomArbitrary(0, 1);
    // }
    let query = "";

    const rooms = [101, 102, 103, 104, 105, 106, 201, 202, 203, 204, 205, 206, 301, 302, 303, 304, 305, 306];
    for(let i = 0; i < rooms.length; i++) {
      for (let j = 0; j < getRandomIntInclusive(1, 3); j++ ) {
        query += `(${rooms[i]}, false, ${getRandomIntInclusive(1, 2)}),`;
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
      DELETE FROM bookings
      `);
  }
}

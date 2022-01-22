import { Room } from "../../src/interfaces/room";
import { getRandomIntInclusive } from "../utils/random";

export default function createRoom() {
  const totalRoomVacancy = getRandomIntInclusive(1, 3);
  const vacant = getRandomIntInclusive(0, totalRoomVacancy);
  const occupied = totalRoomVacancy - vacant;

  const room: Room = {
    roomNumber: getRandomIntInclusive(1, 1000),
    available: vacant,
    unavailable: occupied,
  };

  return room;
}

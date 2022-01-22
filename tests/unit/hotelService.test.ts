import { Room } from "../../src/interfaces/room";
import createRoom from "../factories/roomFactory";
import Hotel from "../../src/entities/Hotel";
import * as hotelService from "../../src/services/client/hotel";

const mockRoom: Room = createRoom();

describe("Hotel Service", () => {
  it("Should return rooms informations when provided id is valid", async () => {
    jest.spyOn(Hotel, "getRooms").mockImplementationOnce(async () => mockRoom);

    const result = await hotelService.getRoomsInfo(1);
    expect(result).toEqual(mockRoom);
  });
});

import Hotel from "../entities/Hotel";
interface HotelDTO extends Hotel {
  vacancy?: number;
}

export default HotelDTO;

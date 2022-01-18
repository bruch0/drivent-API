interface AddressData {
  id: number;
  cep: string;
  street: string;
  city: string;
  number: string;
  state: string;
  neighborhood: string;
  addressDetail: string;
  attendeeId?: number;
}

export default AddressData;

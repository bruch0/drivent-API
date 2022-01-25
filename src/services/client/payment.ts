import Payment from "@/entities/Payment";

async function savePaymentData(ticket: string, hotel: boolean, value: number, userId: number) {
  return await Payment.savePayment(ticket, hotel, value, userId);
}

async function findByUserId(userId: number) {
  const payment = await Payment.findByUserId(userId);
  return payment;
}

export {
  findByUserId,
  savePaymentData,
};

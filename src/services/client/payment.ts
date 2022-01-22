import Payment from "@/entities/Payment";

export async function findByUserId(userId: number) {
  const payment = await Payment.findByUserId(userId);
  return payment;
}

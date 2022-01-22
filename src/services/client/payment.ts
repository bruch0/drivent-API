import Payment from "@/entities/Payment";

async function getPaymentData(userId: number) {
  return await Payment.getPayment(userId);
}

async function savePaymentData(ticket: string, hotel: boolean, value: number, userId: number) {
    return await Payment.savePayment(ticket, hotel, value, userId);
}

export {
    getPaymentData,
    savePaymentData,
}
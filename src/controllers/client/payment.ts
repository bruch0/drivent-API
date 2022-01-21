import { Request, Response } from "express";
import * as paymentService from '@/services/client/payment';
export async function getPaymentByUserId(req: Request, res: Response) {

  const paymentInfo = await paymentService.findByUserId(req.user.id);
}
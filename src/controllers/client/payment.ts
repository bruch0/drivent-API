import { Request, Response } from "express";
import httpStatus from "http-status";

import * as paymentService from "@/services/client/payment";

async function getPaymentByUserId(req: Request, res: Response) {
  const paymentInfo = await paymentService.findByUserId(req.user.id);

  if (!paymentInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  return res.send(paymentInfo);
}

async function savePaymentData(req: Request, res: Response) {
  const  userId  = req.user.id;

  const { ticket, hotel, value } = req.body;

  await paymentService.savePaymentData(ticket, hotel, value, userId);
  res.sendStatus(201);   
}

export {
  getPaymentByUserId,
  savePaymentData,
};

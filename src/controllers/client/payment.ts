import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import * as service from "@/services/client/payment";

interface JwtPayload {
    userId: number
}

async function getPaymentData(req: Request, res: Response) {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const paymentData = await service.getPaymentData(userId);
    res.send(paymentData);
}

async function savePaymentData(req: Request, res: Response) {
    const authHeader = req.header("Authorization");
    const token = authHeader?.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

    const { ticket, hotel, value } = req.body;

    await service.savePaymentData(ticket, hotel, value, userId);
    res.sendStatus(201);   
}

export {
    getPaymentData,
    savePaymentData,
}

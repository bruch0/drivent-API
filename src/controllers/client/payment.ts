import { Request, Response } from 'express';
import httpStatus from 'http-status';

import * as paymentService from '@/services/client/payment';

export async function getPaymentByUserId(req: Request, res: Response) {
	const paymentInfo = await paymentService.findByUserId(req.user.id);

	if (!paymentInfo) {
		return res.sendStatus(httpStatus.NO_CONTENT);
	}

	return res.send(paymentInfo);
}

import { Request, Response } from "express";

import * as authService from "@/services/client/auth";

export async function signIn(req: Request, res: Response) {
  const data = await authService.signIn(req.body.email, req.body.password);
  res.send(data);
}

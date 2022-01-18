import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import UnauthorizedError from "@/errors/Unauthorized";

interface Payload {
    sub: string;
}

export function ensureAuthenticatedAdmin(req: Request, res: Response, next: NextFunction) {
  try {
    const authorization = req.headers.authorization;
    const token = authorization.split("Bearer ")[1];
  
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
  
    req.adminId = Number(sub);
    next();
  } catch {
    throw new UnauthorizedError();
  }
}

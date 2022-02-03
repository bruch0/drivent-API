import { Request, Response } from "express";

import * as certificateService from "@/services/client/certificate";

export async function getUserCertificateInfo(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  const stream = res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=certificate.pdf",
  });

  certificateService.getCertificate(
    (chunk: any) => stream.write(chunk),
    () => stream.end(),
    userId
  );
}

import PDFDocument from "pdfkit";
import { getEnrollmentWithAddress } from "./enrollment";
import { getEventInfo } from "./event";
import { findByUserId } from "./payment";

export async function getCertificate(
  dataCallback: any,
  endCallback: any,
  userId: number
) {
  const { eventTitle } = await getEventInfo();
  const { ticket } = await findByUserId(userId);
  const { name } = await getEnrollmentWithAddress(userId);
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
  });

  doc.on("data", dataCallback);
  doc.on("end", endCallback);
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#fff");
  const distanceMargin = 18;
  doc
    .fillAndStroke("#FA4098")
    .lineWidth(20)
    .lineJoin("round")
    .rect(
      distanceMargin,
      distanceMargin,
      doc.page.width - distanceMargin * 2,
      doc.page.height - distanceMargin * 2
    )
    .stroke();

  const maxWidth = 200;
  const maxHeight = 200;
  doc.image(
    "data:image/png;base64,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",
    doc.page.width / 2 - maxWidth / 2,
    60,
    {
      fit: [maxWidth, maxHeight],
      align: "center",
    }
  );

  jumpLine(doc, 15);

  doc.fontSize(45).fill("#000").text("Certificado de Participação", {
    align: "center",
  });

  jumpLine(doc, 2);

  doc
    .fontSize(20)
    .fill("#000")
    .text(
      `Certifica-se que ${name} participou do evento ${eventTitle} com duração de 8 horas, no modo ${ticket.toLocaleLowerCase()}.`,
      {
        align: "center",
      }
    );

  doc.end();
}

function jumpLine(doc: any, lines: number) {
  for (let i = 0; i < lines; i++) {
    doc.moveDown();
  }
}

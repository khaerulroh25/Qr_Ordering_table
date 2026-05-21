import { prisma } from "@/lib/prisma";

import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const orderId = body.order_id;

    const transactionStatus = body.transaction_status;

    console.log("WEBHOOK MASUK");
    console.log(body);

    // VALIDASI SIGNATURE
    const signatureKey = crypto
      .createHash("sha512")
      .update(
        orderId +
          body.status_code +
          body.gross_amount +
          process.env.MIDTRANS_SERVER_KEY,
      )
      .digest("hex");

    // VALIDASI WEBHOOK
    if (signatureKey !== body.signature_key) {
      return Response.json(
        {
          error: "Invalid signature",
        },
        {
          status: 403,
        },
      );
    }

    // AMBIL ID ORDER
    const orderDbId = Number(orderId.split("-")[1]);

    // PAYMENT SUCCESS
    if (transactionStatus === "capture" || transactionStatus === "settlement") {
      await prisma.order.update({
        where: {
          id: orderDbId,
        },

        data: {
          paymentStatus: "PAID",
        },
      });
    }

    // PAYMENT BELUM SUCCESS
    else {
      await prisma.order.update({
        where: {
          id: orderDbId,
        },

        data: {
          paymentStatus: "PENDING",
        },
      });
    }

    return Response.json({
      message: "Webhook received",
    });
  } catch (error) {
    console.log(error);

    return Response.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}

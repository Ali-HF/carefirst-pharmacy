import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function GET() {
  const error = new Error("Sentry test error — delete me");
  const eventId = Sentry.captureException(error);
  await Sentry.flush(5000);
  return NextResponse.json({
    success: true,
    eventId,
    message: "Test error sent to Sentry! Check your Sentry Issues dashboard.",
  });
}

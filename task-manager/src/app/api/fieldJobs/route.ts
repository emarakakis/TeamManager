import { NextResponse } from "next/server";
import { db, fieldJobsTable } from "../../../../db";

export async function GET(req: Request) {
  try {
    const result = await db.select().from(fieldJobsTable).all();
    if (result.length > 0) {
      return NextResponse.json({ success: true, data: result });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    throw error;
  }
}

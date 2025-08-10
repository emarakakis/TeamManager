import { NextResponse } from "next/server";
import { charTable, db } from "../../../../db";

export async function GET(req: Request) {
  try {
    const result = await db.select().from(charTable);
    console.log(result);
    return NextResponse.json({ success: true, chars: result });
  } catch (err) {
    throw err;
  }
}

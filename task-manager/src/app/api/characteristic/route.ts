import { NextResponse } from "next/server";
import { charTable, db } from "../../../../db";

export async function POST(req: Request) {
  try {
    const char = await req.json();
    const result = await db.insert(charTable).values(char).returning();
    return NextResponse.json({ success: true, char: result[0] });
  } catch (error) {
    throw error;
  }
}

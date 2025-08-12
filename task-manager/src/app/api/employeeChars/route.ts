import { eq } from "drizzle-orm";
import { charTable, db, employeeCharTable } from "../../../../db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const data = await db
      .select({
        id: charTable.id,
        category: charTable.category,
        name: charTable.name,
      })
      .from(charTable)
      .innerJoin(employeeCharTable, eq(employeeCharTable.charId, charTable.id))
      .where(eq(employeeCharTable.employeeId, Number(id)));

    return NextResponse.json({ success: true, employeeChars: data });
  } catch (error) {
    throw error;
  }
}

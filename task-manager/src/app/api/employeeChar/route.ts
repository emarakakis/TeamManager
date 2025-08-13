import { and, eq } from "drizzle-orm";
import { db, employeeCharTable } from "../../../../db";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const employeeId = url.searchParams.get("employeeId");
    const charId = url.searchParams.get("charId");

    const data = await db
      .delete(employeeCharTable)
      .where(
        and(
          eq(employeeCharTable.charId, Number(charId)),
          eq(employeeCharTable.employeeId, Number(employeeId))
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    throw error;
  }
}

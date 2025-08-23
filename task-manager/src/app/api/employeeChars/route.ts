import { and, eq, isNotNull, isNull } from "drizzle-orm";
import { charTable, db, employeeCharTable } from "../../../../db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const type = url.searchParams.get("type");

    let whereClause;
    let joinClause = and(
      eq(employeeCharTable.charId, charTable.id),
      eq(employeeCharTable.employeeId, Number(id))
    );

    if (type === "add") {
      whereClause = isNull(employeeCharTable.employeeId);
    } else {
      whereClause = isNotNull(employeeCharTable.employeeId);
    }

    const data = await db
      .select({
        id: charTable.id,
        category: charTable.category,
        name: charTable.name,
      })
      .from(charTable)
      .leftJoin(employeeCharTable, joinClause)
      .where(whereClause);

    return NextResponse.json({ success: true, employeeChars: data });
  } catch (error) {
    throw error;
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { employeeId, characteristics } = data;

    const insertValues = characteristics.map((char: number) => ({
      charId: char,
      employeeId: employeeId,
    }));

    await db.insert(employeeCharTable).values(insertValues);

    return NextResponse.json({ success: true });
  } catch (err) {
    throw err;
  }
}

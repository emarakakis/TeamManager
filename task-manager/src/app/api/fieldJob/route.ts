import { and, eq } from "drizzle-orm";
import { db, fieldJobsTable, fieldTable, jobTable } from "../../../../db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { jobId, fieldId } = { ...data };

    if (!jobId || !fieldId || isNaN(+fieldId)) {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const result = await db
      .select({
        jobId: jobTable.id,
        fieldId: fieldTable.id,
        area: fieldTable.area,
        fieldName: fieldTable.name,
        jobName: jobTable.name,
        profession: jobTable.profession,
      })
      .from(jobTable)
      .innerJoin(fieldTable, eq(fieldTable.id, Number(fieldId)))
      .where(eq(jobTable.id, Number(jobId)))
      .all();

    if (result.length > 0) {
      const fieldJob = result[0];
      const ins = await db.insert(fieldJobsTable).values(fieldJob);

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, status: 400 });
    }
  } catch (error) {
    throw error;
  }
}

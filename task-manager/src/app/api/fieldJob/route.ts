import { and, eq } from "drizzle-orm";
import { db, fieldJobsTable, fieldTable, jobTable } from "../../../../db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { jobId, fieldId } = { ...data };

    console.log("I am here.");

    if (!jobId || !fieldId || isNaN(+fieldId)) {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }

    const res1 = await db.select().from(fieldJobsTable);
    console.log(1, res1);

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

      const assignJob = await db
        .update(jobTable)
        .set({ assigned: 1 })
        .where(eq(jobTable.id, Number(fieldJob.jobId)));

      const ins = await db.insert(fieldJobsTable).values(fieldJob);

      const res2 = await db.select().from(fieldJobsTable);
      console.log(2, res2);

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, status: 400 });
    }
  } catch (error) {
    throw error;
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const jobId = url.searchParams.get("jobId");
    const fieldId = url.searchParams.get("fieldId");

    const result = await db
      .select()
      .from(fieldJobsTable)
      .where(
        and(
          eq(fieldJobsTable.jobId, Number(jobId)),
          eq(fieldJobsTable.fieldId, Number(fieldId))
        )
      );

    if (result.length > 0) {
      return NextResponse.json({ success: true, fieldJob: result[0] });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    throw error;
  }
}

export async function PUT(req: Request) {
  try {
    const fieldJob = await req.json();

    if (fieldJob.type && fieldJob.type === "assignAction") {
      console.log(fieldJob.assigned);
      const result = await db
        .update(fieldJobsTable)
        .set({ assigned: fieldJob.assigned })
        .where(
          and(
            eq(fieldJobsTable.fieldId, Number(fieldJob.fieldId)),
            eq(fieldJobsTable.jobId, Number(fieldJob.jobId))
          )
        );
      return NextResponse.json({ success: true });
    } else {
      const result = await db
        .update(fieldJobsTable)
        .set(fieldJob)
        .where(
          and(
            eq(fieldJobsTable.fieldId, Number(fieldJob.fieldId)),
            eq(fieldJobsTable.jobId, Number(fieldJob.jobId))
          )
        );

      return NextResponse.json({ success: true });
    }
  } catch (error) {
    throw error;
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const jobId = url.searchParams.get("jobId");
    const fieldId = url.searchParams.get("fieldId");

    const result = await db
      .delete(fieldJobsTable)
      .where(
        and(
          eq(fieldJobsTable.jobId, Number(jobId)),
          eq(fieldJobsTable.fieldId, Number(fieldId))
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    throw error;
  }
}

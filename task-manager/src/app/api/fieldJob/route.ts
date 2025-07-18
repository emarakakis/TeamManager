import { and, eq } from "drizzle-orm";
import { db, fieldJobsTable, fieldTable, jobTable } from "../../../../db";
import { NextResponse } from "next/server";
import { error } from "console";
import axios from "axios";

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
        jobFieldArea: fieldTable.area,
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
      return NextResponse.json({ success: true, data: result[0] });
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

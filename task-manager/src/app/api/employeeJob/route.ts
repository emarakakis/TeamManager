import { NextResponse } from "next/server";
import {
  db,
  employeeJobTable,
  employeeTable,
  fieldJobsTable,
} from "../../../../db";
import { and, eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const employeeJob = await request.json();
    const result = await db.insert(employeeJobTable).values(employeeJob);
    const assignEmployee = await db
      .update(employeeTable)
      .set({ assigned: 1 })
      .where(eq(employeeTable.id, Number(employeeJob.employeeId)));
    const assignFieldJob = await db
      .update(fieldJobsTable)
      .set({ assigned: 1 })
      .where(
        and(
          eq(fieldJobsTable.jobId, Number(employeeJob.jobId)),
          eq(fieldJobsTable.fieldId, Number(employeeJob.fieldId))
        )
      );
    return NextResponse.json({ success: true });
  } catch (error) {
    throw error;
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const employeeId = url.searchParams.get("employeeId");
    const jobId = url.searchParams.get("jobId");
    const fieldId = url.searchParams.get("fieldId");

    const result = await db
      .delete(employeeJobTable)
      .where(
        and(
          eq(employeeJobTable.employeeId, Number(employeeId)),
          eq(employeeJobTable.fieldId, Number(fieldId)),
          eq(employeeJobTable.jobId, Number(jobId))
        )
      );

    return NextResponse.json({ success: true });
  } catch (error) {
    throw error;
  }
}

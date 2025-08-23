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

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (id) {
      const result = await db
        .select()
        .from(employeeJobTable)
        .where(eq(employeeJobTable.id, Number(id)));
      return NextResponse.json({ success: true, employeeJob: result[0] });
    } else {
      const employeeId = url.searchParams.get("employeeId");
      const jobId = url.searchParams.get("jobId");
      const fieldId = url.searchParams.get("fieldId");

      const result = await db
        .select({
          id: employeeJobTable.id,
          employee: {
            id: employeeTable.id,
            name: employeeTable.name,
            surname: employeeTable.surname,
            email: employeeTable.email,
            sex: employeeTable.sex,
            phoneNumber: employeeTable.phoneNumber,
          },
          field: {
            id: fieldJobsTable.fieldId,
            name: fieldJobsTable.fieldName,
            area: fieldJobsTable.area,
          },
          job: {
            id: fieldJobsTable.jobId,
            name: fieldJobsTable.jobName,
            profession: fieldJobsTable.profession,
          },
        })
        .from(employeeJobTable)
        .innerJoin(
          employeeTable,
          eq(employeeJobTable.employeeId, employeeTable.id)
        )
        .innerJoin(
          fieldJobsTable,
          and(
            eq(fieldJobsTable.jobId, employeeJobTable.jobId),
            eq(fieldJobsTable.fieldId, employeeJobTable.fieldId)
          )
        )
        .where(
          and(
            eq(employeeJobTable.employeeId, Number(employeeId)),
            eq(employeeJobTable.fieldId, Number(fieldId)),
            eq(employeeJobTable.jobId, Number(jobId))
          )
        )
        .all();

      return NextResponse.json({ success: true, employeeJob: result[0] });
    }
  } catch (error) {
    throw error;
  }
}

const allowedTypes = ["field", "job", "employee"] as const;

export async function PUT(request: Request) {
  try {
    const info = await request.json();

    const { employeeJobId, itemId, type } = { ...info };
    if (!allowedTypes.includes(type)) {
      return NextResponse.json(
        { success: false, error: "Invalid type" },
        { status: 400 }
      );
    }

    const result = await db
      .update(employeeJobTable)
      .set({ [`${type}Id`]: itemId })
      .where(eq(employeeJobTable.id, Number(employeeJobId)));

    return NextResponse.json({ success: true });
  } catch (error) {
    throw error;
  }
}

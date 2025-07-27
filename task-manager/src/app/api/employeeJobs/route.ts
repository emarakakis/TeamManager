import { NextResponse } from "next/server";
import {
  db,
  employeeJobTable,
  employeeTable,
  fieldJobsTable,
} from "../../../../db";
import { and, eq } from "drizzle-orm";

export async function GET(req: Request) {
  try {
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
          area: fieldJobsTable.jobFieldArea,
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
          eq(fieldJobsTable.fieldId, fieldJobsTable.fieldId)
        )
      )
      .all();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    throw error;
  }
}

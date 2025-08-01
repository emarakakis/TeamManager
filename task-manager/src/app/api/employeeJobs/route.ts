import { NextResponse } from "next/server";
import {
  db,
  employeeJobTable,
  employeeTable,
  fieldJobsTable,
  fieldTable,
  jobTable,
} from "../../../../db";
import { and, eq, ilike, like } from "drizzle-orm";
import qs from "qs";
import { Employee, EmployeeReturn } from "@/types/employee";
import { JobCreate, JobReturn } from "@/types/Job";
import { FieldData, FieldDataReturn } from "@/types/FieldData";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const { employee, job, field } = qs.parse(url.searchParams.toString());
    const whereClause = generateWhereClause(
      employee as Employee,
      job as JobCreate,
      field as FieldData
    );

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
          id: fieldTable.id,
          name: fieldTable.name,
          area: fieldTable.area,
        },
        job: {
          id: jobTable.id,
          name: jobTable.name,
          profession: jobTable.profession,
        },
      })
      .from(employeeJobTable)
      .innerJoin(
        employeeTable,
        eq(employeeJobTable.employeeId, employeeTable.id)
      )
      .innerJoin(fieldTable, eq(fieldTable.id, employeeJobTable.jobId))
      .innerJoin(jobTable, eq(jobTable.id, employeeJobTable.jobId))
      .where(whereClause)
      .all();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    throw error;
  }
}

function generateWhereClause(
  employee: Employee,
  job: JobCreate,
  field: FieldData
) {
  const condition = [];

  for (const [key, value] of Object.entries(employee ?? {})) {
    condition.push(
      like(employeeTable[key as keyof EmployeeReturn], `${value}%`)
    );
  }

  for (const [key, value] of Object.entries(job ?? {})) {
    condition.push(like(jobTable[key as keyof JobReturn], `${value}%`));
  }

  for (const [key, value] of Object.entries(field ?? {})) {
    condition.push(like(fieldTable[key as keyof FieldDataReturn], `${value}%`));
  }

  return condition.length > 0 ? and(...condition) : undefined;
}

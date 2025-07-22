import { NextResponse } from "next/server";
import { db, employeeTable } from "../../../../db";
import { like, and, eq } from "drizzle-orm";
import { EmployeeReturn } from "@/types/employee";
import { error } from "console";

const columns = [
  "name",
  "surname",
  "id",
  "phoneNumber",
  "email",
  "sex",
  "assigned",
];

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;

    const conditions = [];

    for (const [key, value] of searchParams.entries()) {
      if (columns.includes(key)) {
        conditions.push(
          like(employeeTable[key as keyof EmployeeReturn], `${value}%`)
        );
      }
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const result = await db
      .select()
      .from(employeeTable)
      .where(whereClause)
      .all();

    return NextResponse.json({ success: true, employees: result });
  } catch (error) {
    throw error;
  }
}

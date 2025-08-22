import { EmployeeCreate } from "@/types/employee";
import { db, employeeTable } from "../../../../db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const employee = await req.json();
    const result = await db.insert(employeeTable).values({
      name: employee.name,
      surname: employee.surname,
      phoneNumber: employee.phoneNumber,
      sex: employee.sex,
      email: employee.email,
    });
    return NextResponse.json({ success: 200 });
  } catch (error) {
    throw error;
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const result = await db
      .select()
      .from(employeeTable)
      .where(eq(employeeTable.id, Number(id)));
    if (result.length > 0) {
      return NextResponse.json({ success: true, employee: result[0] });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    throw error;
  }
}

export async function PUT(req: Request) {
  try {
    const employee = await req.json();
    const result = await db
      .update(employeeTable)
      .set(employee)
      .where(eq(employeeTable.id, Number(employee.id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    throw error;
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const res = await db
      .delete(employeeTable)
      .where(eq(employeeTable.id, Number(id)));
    return NextResponse.json({ success: true, status: 200 });
  } catch (error) {
    throw error;
  }
}

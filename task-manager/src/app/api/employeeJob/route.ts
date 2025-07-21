import { NextResponse } from "next/server";
import { db, employeeJobTable } from "../../../../db";

export async function POST(request: Request) {
  try {
    const employeeJob = await request.json();
    console.log(employeeJob);
    const result = await db.insert(employeeJobTable).values(employeeJob);
    return NextResponse.json({ success: true });
  } catch (error) {
    throw error;
  }
}

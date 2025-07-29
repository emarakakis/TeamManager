import { NextResponse } from "next/server";
import { db, fieldTable } from "../../../../db";
import { stat } from "fs";
import { FieldData, FieldDataReturn } from "@/types/FieldData";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const field = await request.json();
    const result = await db.insert(fieldTable).values(field);

    return NextResponse.json({ success: true, status: 200 });
  } catch (error) {
    throw error;
  }
}

export async function PUT(request: Request) {
  try {
    const field = await request.json();
    console.log(field);
    const result = await db
      .update(fieldTable)
      .set(field)
      .where(eq(fieldTable.id, Number(field.id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    throw error;
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    console.log(id);

    const result = await db
      .delete(fieldTable)
      .where(eq(fieldTable.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    throw error;
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    console.log(id);

    const result = await db
      .select()
      .from(fieldTable)
      .where(eq(fieldTable.id, Number(id)));
    if (result.length > 0) {
      return NextResponse.json({ success: true, data: result[0] });
    } else return NextResponse.json({ success: false });
  } catch (error) {
    throw error;
  }
}

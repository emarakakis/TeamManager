import { NextResponse } from "next/server";
import { db, fieldJobsTable } from "../../../../db";
import { and, like } from "drizzle-orm";
import { FieldDataReturn } from "@/types/FieldData";
import { FieldJobReturn } from "@/types/FieldJob";

const columns = ["fieldName", "jobName", "profession", "area", "assigned"];

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const searchParams = url.searchParams;
    const conditions = [];
    for (const [key, value] of searchParams.entries()) {
      if (columns.includes(key))
        conditions.push(
          like(fieldJobsTable[key as keyof FieldJobReturn], `${value}%`)
        );
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    searchParams.entries().forEach(([key, value]) => {});
    const result = await db
      .select()
      .from(fieldJobsTable)
      .where(whereClause)
      .all();

    console.log(result);
    if (result.length > 0) {
      return NextResponse.json({ success: true, data: result });
    } else {
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    throw error;
  }
}

import { NextResponse } from "next/server";
import { db, jobTable } from "../../../../db";
import { like } from "drizzle-orm";

export async function GET(req:Request) {
    try{
        const url = new URL(req.url)
        const query = url.searchParams.get('query')
        console.log(query)
        const result = await db.select().from(jobTable).where(like(jobTable.name, `${query}%`)).all()

        if (!Array.isArray(result)){
            throw new Error("Something bad went on")
        }

        return NextResponse.json({success: true, data:result})
    } catch (error) {
        throw error
    }
    
    
}
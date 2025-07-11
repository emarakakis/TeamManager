import { NextResponse } from "next/server";
import { db, jobTable } from "../../../../db";

export async function POST(req:Request) {
    try{
        const job = await req.json()
        const result = await db.insert(jobTable).values(job)

        return NextResponse.json({success: true})
    } catch (error) {
        throw error
    }
    
    
}
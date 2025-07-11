import { NextResponse } from "next/server";
import { db, jobTable } from "../../../../db";

export async function GET(req:Request) {
    try{
        const result = await db.select().from(jobTable).all()

        if (!Array.isArray(result)){
            throw new Error("Something bad went on")
        }

        return NextResponse.json({success: true, data:result})
    } catch (error) {
        throw error
    }
    
    
}
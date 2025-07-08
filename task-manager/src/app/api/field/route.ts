import { NextResponse } from "next/server";
import { db, fieldTable } from "../../../../db";
import { stat } from "fs";

export async function POST(request: Request){
    try{
        const field = await request.json()
        console.log(field)

        const result = await db.insert(fieldTable).values(field)
        return NextResponse.json({success: true, status: 200})
        
    } catch (error) {
        throw error
    }

}
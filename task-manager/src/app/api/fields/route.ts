import { NextResponse } from "next/server"
import { db, fieldTable } from "../../../../db"

export async function GET(req: Request){
    try{
        const result = await db.select().from(fieldTable).all()
        return NextResponse.json(result)
    } catch (error) {
        console.log("Error when getting Fields.")
        throw error
    }
}
import { NextResponse } from "next/server"
import { db, fieldTable } from "../../../../db"
import { eq, like } from "drizzle-orm"

export async function GET(req: Request){
    try{
        const url = new URL(req.url)
        const query = url.searchParams.get('query')
        const result = await db.select().from(fieldTable).where(like(fieldTable.name, `${query}%`)).all()
        return NextResponse.json(result)
        
        
    } catch (error) {
        console.log("Error when getting Fields.")
        throw error
    }
}
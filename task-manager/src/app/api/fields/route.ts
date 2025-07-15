import { NextResponse } from "next/server"
import { db, fieldTable } from "../../../../db"
import { eq, like, and } from "drizzle-orm"
import { FieldDataReturn } from "@/types/FieldData"

const columns = ['id', 'name', 'area']

export async function GET(req: Request){
    try{
        const url = new URL(req.url)
        const query = url.searchParams
        query.forEach((value, key) => console.log(key, value))

        const conditions = []
        for (const [key, value] of query.entries()){
            if (columns.includes(key)){
                const k = fieldTable[key as keyof FieldDataReturn]
                conditions.push(like(k, `${value}%`))
            }   
        }


        const whereClause = conditions.length > 0 ? and(...conditions) : undefined


        const result = await db
            .select()
            .from(fieldTable)
            .where(whereClause)
        return NextResponse.json(result)
        
        
    } catch (error) {
        console.log("Error when getting Fields.")
        throw error
    }
}
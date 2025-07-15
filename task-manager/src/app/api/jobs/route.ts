import { NextResponse } from "next/server";
import { db, jobTable } from "../../../../db";
import { and, like } from "drizzle-orm";
import { JobReturn } from "@/types/Job";

const columns = ['name', 'profession', 'fieldId']

export async function GET(req:Request) {
    try{
        const url = new URL(req.url)
        const searchParams = url.searchParams

        const conditions = []

        for(const [key, value] of searchParams.entries()){
            if (columns.includes(key)){
                const k = key as keyof JobReturn
                conditions.push(like(jobTable[k], `${value}%`)) 
            }
        }

        const whereClause = conditions.length > 0 ? and(...conditions) : undefined


        const query = url.searchParams.get('query')
        const result = await db
            .select()
            .from(jobTable)
            .where(whereClause).all()

        if (!Array.isArray(result)){
            throw new Error("Something bad went on")
        }

        return NextResponse.json({success: true, data:result})
    } catch (error) {
        throw error
    }
    
    
}
import { NextResponse } from "next/server";
import { db, jobTable } from "../../../../db";
import { eq } from "drizzle-orm";

export async function POST(req:Request) {
    try{
        const job = await req.json()
        const result = await db.insert(jobTable).values(job)

        return NextResponse.json({success: true})
    } catch (error) {
        throw error
    }
}

export async function DELETE(req:Request) {
    try{
        const url = new URL(req.url)
        const id = url.searchParams.get('id')
        console.log(id)

        const result = await db.delete(jobTable).where(eq(jobTable.id, Number(id)))

        return NextResponse.json({success:true})

    } catch(error) {
        throw error
    }
}

export async function GET(req:Request){
    try{
        const url = new URL(req.url)
        const id = url.searchParams.get('id')

        const result = await db.select().from(jobTable).where(eq(jobTable.id, Number(id)))

        if (result.length > 0){
            return NextResponse.json({success:true, data: result[0]})
        } else {
            return NextResponse.json({success:false})
        }
    } catch (error) {
        throw error
    }
}

export async function PUT(req: Request){
    try {
        const job = await req.json()

        const result = await db.update(jobTable).set(job).where(eq(jobTable.id, Number(job.id)))
        return NextResponse.json({success:true})
    } catch (error) {
        throw error
    }
}
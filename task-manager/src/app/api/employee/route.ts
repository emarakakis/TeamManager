import { Employee } from "@/types/employee"
import { db, employeeTable } from "../../../../db"
import { NextResponse } from "next/server"
import { eq } from "drizzle-orm";

export async function POST(req:Request){
    try{
        const employee = await req.json()
        const result = await db.insert(employeeTable).values({
            name: employee.name,
            surname: employee.surname,
            phoneNumber: employee.phoneNumber,
            sex: employee.sex,
            email: employee.email,
        });
        return NextResponse.json({success : 200})
    } catch(error) {
        console.log("Something went wrong with addition!")
        throw error
    }
}

export async function GET(req:Request){
    try{
        const url = new URL(req.url)
        const id = url.searchParams.get('id')
        const result = await db.select().from(employeeTable).where(eq(employeeTable.id, Number(id)))
        console.log(result)
        return NextResponse.json(result[0])
    } catch (error) {
        throw error
    }
}
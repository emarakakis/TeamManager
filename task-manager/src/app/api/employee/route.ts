import { Employee } from "@/types/employee"
import { db, employeeTable } from "../../../../db"
import { NextResponse } from "next/server"

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
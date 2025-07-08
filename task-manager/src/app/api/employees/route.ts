import { NextResponse } from 'next/server'
import {db, employeeTable} from '../../../../db'

export async function GET(request: Request){
    const result = await db.select().from(employeeTable).all()
    if (!Array.isArray(result)){
        throw new Error("Mple")
    }
    return NextResponse.json(result)
}
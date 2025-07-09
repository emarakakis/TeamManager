import { EmployeeReturn } from "@/types/employee";
import axios from "axios";
export default async function getEmployee(id: string){
    console.log(`This is the id ${id}`)
    const result = await axios.get<EmployeeReturn>(`/api/employee?id=${id}`)
    const data = await result.data

    console.log(data)

    if (typeof data !== 'object' || !data || !data.id){
        throw new Error("Something went wrong while fetching an Employee")
    }

    return data
}
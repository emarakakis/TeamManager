import { EmployeeReturn } from "@/types/employee";
import axios from "axios";
import qs from "qs"
export default async function getEmployee(id: Object | string){
    const result = await axios.get<EmployeeReturn>(`/api/employee?id=${id}`)
    const data = await result.data

    if (typeof data !== 'object' || !data || !data.id){
        throw new Error("Something went wrong while fetching an Employee")
    }

    return data
}
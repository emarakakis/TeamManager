import { EmployeeReturn } from "@/types/employee";
import axios from "axios";
import qs from "qs"
export default async function getEmployee(query: Object | string){
    let search = query
    if (typeof query === 'object'){
        search = qs.stringify(query, {encode: false})
    }
    console.log(query)
    const result = await axios.get<EmployeeReturn>(`/api/employee?query=${search}`)
    const data = await result.data

    console.log(data)

    if (typeof data !== 'object' || !data || !data.id){
        throw new Error("Something went wrong while fetching an Employee")
    }

    return data
}
import { EmployeeReturn } from "@/types/employee";
import axios from "axios";

export default async function getEmployees(employeeParam: string | null){

    const result = await axios.get<EmployeeReturn[]>(`/api/employees?${employeeParam}`)
    if (!result) throw new Error("Mple")
    let data =  await result.data
    if (employeeParam)
        data = data.filter(employee => employee.name.startsWith(employeeParam))
    return data
}
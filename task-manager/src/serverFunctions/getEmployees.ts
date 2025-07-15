import { EmployeeReturn } from "@/types/employee";
import axios from "axios";

export default async function getEmployees(employeeParam: string | null){

    const result = await axios.get(`/api/employees?${employeeParam}`)
    const data = result.data
    if (!data.success){
        throw new Error("Mple")
    }
    return data.employees
}
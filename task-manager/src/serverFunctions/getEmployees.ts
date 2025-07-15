import { EmployeeReturn } from "@/types/employee";
import axios from "axios";
import qs from 'qs'
export default async function getEmployees(employeeSearchParam: Object){
    const query = qs.stringify(employeeSearchParam)
    const result = await axios.get(`/api/employees?${query}`)
    const data = result.data
    if (!data.success){
        throw new Error("Mple")
    }
    return data.employees
}
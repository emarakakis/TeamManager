import { Employee } from "@/types/employee";
import axios from "axios";

export default async function getEmployees(){
    const result = await axios.get<Employee[]>('/api/employees')
    if (!result) throw new Error("Mple")
    return result.data
}
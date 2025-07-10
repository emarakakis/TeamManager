import { EmployeeReturn } from "@/types/employee";
import axios from "axios";

export default async function putEmployee(employee: EmployeeReturn){
    const result = await axios.put('/api/employee', employee)
    const data = result.data
    if (!data.success){
        throw new Error("Something went wrong when Updating a User")
    }

    return
}
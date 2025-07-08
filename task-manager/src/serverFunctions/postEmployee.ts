import { Employee } from "@/types/employee";
import axios from "axios";

export default async function postEmployee(employee: Employee){
    const result = await axios.post("/api/employee", employee)
}
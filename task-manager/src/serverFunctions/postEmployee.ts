import { EmployeeCreate } from "@/types/employee";
import axios from "axios";

export default async function postEmployee(employee: EmployeeCreate) {
  const result = await axios.post("/api/employee", employee);
}

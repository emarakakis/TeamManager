import { EmployeeReturn } from "@/types/employee";
import axios from "axios";

export default async function getEmployee(id: Object | string) {
  const result = await axios.get(`/api/employee?id=${id}`);
  const resultData = result.data;

  if (!resultData.success) {
    throw new Error("Something went wrong when getting an Employee");
  }

  return resultData.data;
}

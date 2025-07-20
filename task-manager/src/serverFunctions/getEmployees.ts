import axios from "axios";
import qs from "qs";
import { ObjectType } from "@/app/hooks/query-state-hook";
export default async function getEmployees(employeeSearchParam: ObjectType) {
  const query = qs.stringify(employeeSearchParam);
  const result = await axios.get(`/api/employees?${query}`);
  const data = result.data;
  if (!data.success) {
    throw new Error("Mple");
  }
  return data.employees;
}

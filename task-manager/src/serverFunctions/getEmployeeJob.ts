import { EmployeeJobId, EmployeeJobReturn } from "@/types/EmployeeJob";
import axios from "axios";
import qs from "qs";
export default async function getEmployeeJob(
  id: EmployeeJobId | number
): Promise<EmployeeJobReturn> {
  const query = qs.stringify(id);
  const result = await axios.get<{
    employeeJob: EmployeeJobReturn;
    success: boolean;
  }>(`/api/employeeJob?${query}`);
  const resultData = result.data;

  if (!resultData.success) {
    throw new Error("Something went wrong when fetching EmployeeJob");
  }

  return resultData.employeeJob;
}

import { SearchFields } from "@/modules/Search/EmployeeJobSearch";
import { Employee } from "@/types/employee";
import { EmployeeJob, EmployeeJobReturn } from "@/types/EmployeeJob";
import { FieldData } from "@/types/FieldData";
import { JobReturn } from "@/types/Job";
import axios from "axios";
import qs from "qs";

export default async function getEmployeeJobs(searchBatch: SearchFields) {
  const result = await axios.get<{
    data: EmployeeJobReturn[];
    success: boolean;
  }>(`/api/employeeJobs?${qs.stringify(searchBatch)}`);
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when fetching the EmployeeJobs");
  }

  const employeeJobs = data.data;

  if (!Array.isArray(employeeJobs)) {
    throw new Error("Result is not of type Array");
  }

  return employeeJobs;
}

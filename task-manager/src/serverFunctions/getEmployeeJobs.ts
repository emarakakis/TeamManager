import { EmployeeJob } from "@/types/EmployeeJob";
import axios from "axios";

export default async function getEmployeeJobs() {
  const result = await axios.get<{ data: EmployeeJob[]; success: boolean }>(
    "/api/employeeJobs"
  );
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

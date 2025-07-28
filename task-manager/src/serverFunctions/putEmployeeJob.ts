import { EmployeeJobId, EmployeeJobReturn } from "@/types/EmployeeJob";
import axios from "axios";
import postFieldJob from "./postFieldJob";

export default async function putEmployeeJob(info: {
  employeeJobId: number;
  type: string;
  itemId: number;
}) {
  const { employeeJobId, type, itemId } = { ...info };
  const employeeJob = await axios.get<{
    data: { id: number } & EmployeeJobId;
    success: boolean;
  }>(`/api/employeeJob?id=${employeeJobId}`);
  const employeeJobData = employeeJob.data.data;
  console.log(employeeJobData);
  if (type === "employee") {
  } else if (type === "field") {
    let unAssignCurrent = await axios.put(`/api/fieldJob`, {
      type: "assignAction",
      assigned: 0,
      jobId: employeeJobData.jobId,
      fieldId: employeeJobData.fieldId,
    });

    if (!unAssignCurrent.data.success)
      throw new Error("Something went wrong when Un-Assigning Field-Job");

    let createNewFieldJob = await postFieldJob({
      jobId: employeeJobData.jobId.toString(),
      fieldId: itemId.toString(),
    });

    let updateFieldJob = await axios.put(`/api/fieldJob`, {
      type: "assignAction",
      assigned: 1,
      jobId: employeeJobData.jobId,
      fieldId: itemId,
    });
  }

  const result = await axios.put(`/api/employeeJob`, info);

  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when updating an employeeJob");
  }

  console.log("Ended Put");
}

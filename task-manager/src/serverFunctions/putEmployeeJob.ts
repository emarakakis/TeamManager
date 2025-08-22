import { EmployeeJobId } from "@/types/EmployeeJob";
import axios from "axios";
import postFieldJob from "./postFieldJob";
import changeFieldJob from "./changeFieldJob";

export default async function putEmployeeJob(info: {
  employeeJobId: number;
  type: string;
  itemId: number;
}) {
  const { employeeJobId, type, itemId } = info;
  const employeeJob = await axios.get<{
    employeeJob: { id: number } & EmployeeJobId;
    success: boolean;
  }>(`/api/employeeJob?id=${employeeJobId}`);
  const employeeJobData = employeeJob.data.employeeJob;

  if (type === "employee") {
    await updateEmployee(employeeJobData.employeeId, info.itemId);
  } else {
    await updateFieldJob(
      type,
      {
        jobId: employeeJobData.jobId,
        fieldId: employeeJobData.fieldId,
      },
      itemId
    );
  }
  const result = await axios.put(`/api/employeeJob`, info);

  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when updating an employeeJob");
  }
}

async function updateEmployee(oldId: number, newId: number) {
  await axios.put(`/api/employee`, {
    type: "assignAction",
    assigned: 0,
    id: oldId,
  });

  await axios.put(`/api/employee`, {
    type: "assignAction",
    assigned: 1,
    id: newId,
  });
}

async function updateFieldJob(
  type: string,
  fieldJobId: { jobId: number; fieldId: number },
  itemId: number
) {
  const { jobId, fieldId } = fieldJobId;

  if (type === "field")
    await changeFieldJob({
      newId: { jobId, fieldId: itemId },
      previousId: fieldJobId,
    });
  else
    await changeFieldJob({
      newId: { jobId: itemId, fieldId },
      previousId: fieldJobId,
    });
}

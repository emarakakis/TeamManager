import { EmployeeJobId, EmployeeJobReturn } from "@/types/EmployeeJob";
import axios from "axios";
import postFieldJob from "./postFieldJob";
import getJob from "./getJob";
import postJob from "./postJob";

export default async function putEmployeeJob(info: {
  employeeJobId: number;
  type: string;
  itemId: number;
}) {
  const { employeeJobId, type, itemId } = { ...info };
  console.log("Wtf");
  const employeeJob = await axios.get<{
    data: { id: number } & EmployeeJobId;
    success: boolean;
  }>(`/api/employeeJob?id=${employeeJobId}`);
  const employeeJobData = employeeJob.data.data;

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

  console.log("Ended Put");
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
  const unAssignCurrent = await axios.put(`/api/fieldJob`, {
    type: "assignAction",
    assigned: 0,
    jobId: fieldJobId.jobId,
    fieldId: fieldJobId.fieldId,
  });

  if (!unAssignCurrent.data.success)
    throw new Error("Something went wrong when Un-Assigning Field-Job");

  const [fieldId, jobId] =
    type === "field"
      ? await updateField(fieldJobId, itemId)
      : await updateJob(fieldJobId, itemId);

  let updateFieldJob = await axios.put(`/api/fieldJob`, {
    type: "assignAction",
    assigned: 1,
    jobId: jobId,
    fieldId: fieldId,
  });
}

async function updateField(
  oldId: { jobId: number; fieldId: number },
  newId: number
) {
  const [fieldId, jobId] = await getFieldJobId(oldId.jobId, newId);
  return [fieldId, jobId];
}

async function updateJob(
  oldId: { jobId: number; fieldId: number },
  newId: number
) {
  let unAssignCurrent = await axios.put(`/api/job`, {
    type: "assignAction",
    assigned: 0,
    id: oldId.jobId,
  });

  const [fieldId, jobId] = await getFieldJobId(newId, oldId.fieldId);

  let assignCurrent = await axios.put(`/api/job`, {
    type: "assignAction",
    assigned: 1,
    id: jobId,
  });

  return [fieldId, jobId];
}

async function getFieldJobId(jobId: number, fieldId: number) {
  const existingFieldJob = await axios.get(
    `/api/fieldJob?fieldId=${fieldId}&jobId=${jobId}`
  );
  const existingData = existingFieldJob.data;
  if (!existingData.success) {
    await postFieldJob({
      jobId: jobId.toString(),
      fieldId: fieldId.toString(),
    });
    return [jobId, fieldId];
  } else {
    const existingFieldJob = existingData.data;
    if (!existingFieldJob.assigned) {
      console.log("Unassigned FieldJob Exists!");
      return [jobId, fieldId];
    } else {
      throw new Error("Exists Already! No Implementation");
    }
  }
}

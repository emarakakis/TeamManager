import getEmployee from "@/serverFunctions/getEmployee";
import getField from "@/serverFunctions/getField";
import { ObjectType } from "@/app/hooks/query-state-hook";
import getJob from "@/serverFunctions/getJob";
import getEmployeeJob from "@/serverFunctions/getEmployeeJob";
import { EmployeeJob, EmployeeJobId } from "@/types/EmployeeJob";
import { EmployeeReturn } from "@/types/employee";
import { JobReturn } from "@/types/Job";
import { FieldDataReturn } from "@/types/FieldData";
import { FieldJobReturn } from "@/types/FieldJob";
import getFieldJob from "@/serverFunctions/getFieldJob";

type FieldJobId = { jobId: number; fieldId: number };
export type ItemType =
  | EmployeeReturn
  | JobReturn
  | FieldDataReturn
  | FieldJobReturn
  | null;

export default async function getItemFunction(
  type: string,
  id: number | EmployeeJobId | FieldJobId
): Promise<ItemType> {
  console.log(id);
  if (type === "employee") {
    return await getEmployee(id);
  } else if (type === "field") {
    return await getField(id as number);
  } else if (type === "job") {
    return await getJob(id as number);
  } else if (type === "fieldJob") {
    return await getFieldJob(id as FieldJobId);
  } else {
    return null;
  }
}

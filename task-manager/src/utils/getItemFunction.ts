import getEmployee from "@/serverFunctions/getEmployee";
import getField from "@/serverFunctions/getField";
import { ObjectType } from "@/app/hooks/query-state-hook";
import getJob from "@/serverFunctions/getJob";
import getEmployeeJob from "@/serverFunctions/getEmployeeJob";
import { EmployeeJob, EmployeeJobId } from "@/types/EmployeeJob";
import { EmployeeReturn } from "@/types/employee";
import { JobReturn } from "@/types/Job";
import { FieldDataReturn } from "@/types/FieldData";

export default async function getItemFunction(
  type: string,
  id: number | EmployeeJobId
): Promise<EmployeeReturn | JobReturn | FieldDataReturn | null> {
  if (type === "employee") {
    return await getEmployee(id);
  } else if (type === "field") {
    return await getField(id as number);
  } else if (type === "job") {
    return await getJob(id as number);
  }
  //   else if (type === "employeeJob") {
  //     return await getEmployeeJob(id as EmployeeJobId);}
  else {
    return null;
  }
}

import { EmployeeReturn } from "@/types/employee";
import { FieldData, FieldDataReturn } from "@/types/FieldData";
import { JobReturn } from "@/types/Job";
import getEmployees from "./getEmployees";
import getFields from "./getFields";
import getJobs from "./getJobs";

export default async function getChangeTableData(type: string) {
  let result: EmployeeReturn[] | FieldDataReturn[] | JobReturn[];
  try {
    if (type === "employee") {
      result = await getEmployees({});
    } else if (type === "field") {
      result = await getFields({});
    } else if (type === "job") {
      result = await getJobs({});
    } else {
      throw new Error("This type doesn't exist");
    }

    return result;
  } catch (error) {
    throw error;
  }
}

import { EmployeeReturn } from "@/types/employee";
import { FieldDataReturn } from "@/types/FieldData";
import { JobReturn } from "@/types/Job";
import getEmployees from "./getEmployees";
import getFields from "./getFields";
import getJobs from "./getJobs";

export type FieldJobConcat = { fields: FieldDataReturn[]; jobs: JobReturn[] };
type ChangeDataTypes =
  | EmployeeReturn[]
  | FieldDataReturn[]
  | JobReturn[]
  | FieldJobConcat;

export default async function getChangeTableData(
  type: string
): Promise<ChangeDataTypes> {
  let result: ChangeDataTypes;
  try {
    if (type === "employee") {
      result = await getEmployees({});
    } else if (type === "field") {
      result = await getFields({});
    } else if (type === "job") {
      result = await getJobs({});
    } else if (type === "fieldJob") {
      const jobs = await getJobs({});
      const fields = await getFields({});
      return { jobs, fields };
    } else {
      throw new Error("This type doesn't exist");
    }

    return result;
  } catch (error) {
    throw error;
  }
}

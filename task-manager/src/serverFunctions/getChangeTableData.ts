import { EmployeeReturn } from "@/types/employee";
import { FieldDataReturn } from "@/types/FieldData";
import { JobReturn } from "@/types/Job";
import getEmployees from "./getEmployees";
import getFields from "./getFields";
import getJobs from "./getJobs";
import getFieldJobs from "./getFieldJobs";
import { FieldJob } from "@/types/FieldJob";

export type FieldJobIdConcat = {
  id: { jobId: number; fieldId: number };
} & FieldJob;

export default async function getChangeTableData(type: string) {
  let result: EmployeeReturn[] | FieldDataReturn[] | JobReturn[];
  try {
    if (type === "employee") {
      result = await getEmployees({});
    } else if (type === "field") {
      result = await getFields({});
    } else if (type === "job") {
      result = await getJobs({});
    } else if (type === "fieldJob") {
      return getFieldJobs({}).then((result) => {
        return result.map((item) => {
          const { jobId, fieldId, ...rest } = item;
          return { id: { jobId, fieldId }, ...rest };
        });
      });
    } else {
      throw new Error("This type doesn't exist");
    }

    return result;
  } catch (error) {
    throw error;
  }
}

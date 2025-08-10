import axios from "axios";
import getJob from "./getJob";
import postJob from "./postJob";
import postFieldJob from "./postFieldJob";

export default async function postEmployeeJob(employeeJob: {
  jobId: number;
  fieldId: number;
  employeeId: number;
  keepFields: boolean;
}) {
  const { keepFields, ...ids } = employeeJob;
  if (keepFields) {
    const { id: discard, ...rest } = await getJob(employeeJob.jobId);
    const jobId = await postJob(rest);
    await postFieldJob({
      fieldJobId: { jobId, fieldId: employeeJob.fieldId },
      keepFields: false,
    });
  }
  const result = await axios.post("/api/employeeJob", ids);
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when creating an EmployeeJob");
  }
}

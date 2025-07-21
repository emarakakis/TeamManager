import axios from "axios";

export default async function postEmployeeJob(employeeJob: {
  jobId: number;
  fieldId: number;
  employeeId: number;
}) {
  const result = await axios.post("/api/employeeJob", employeeJob);
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when creating an EmployeeJob");
  }
}

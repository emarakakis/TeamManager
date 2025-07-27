import axios from "axios";
import qs from "qs";
export default async function getEmployeeJob(id: {
  jobId: number;
  employeeId: number;
  fieldId: number;
}) {
  const query = qs.stringify(id);
  const result = await axios.get(`/api/employeeJob?${query}`);
  const resultData = result.data;

  if (!resultData.success) {
    throw new Error("Something went wrong when fetching EmployeeJob");
  }

  return resultData.data;
}

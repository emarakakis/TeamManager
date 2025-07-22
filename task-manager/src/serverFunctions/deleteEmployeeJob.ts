import axios from "axios";
import qs from "qs";
export default async function deleteEmployeeJob(id: {
  employeeId: number;
  jobId: number;
  fieldId: number;
}) {
  const query = qs.stringify(id);
  const result = await axios.delete(`/api/employeeJob?${query}`);
}

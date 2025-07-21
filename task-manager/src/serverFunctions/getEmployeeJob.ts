import axios from "axios";

export default async function getEmployeeJob(id: {
  jobId: number;
  employeeId: number;
  fieldId: number;
}) {
  const result = await axios.get("/api/employeeJob");
}

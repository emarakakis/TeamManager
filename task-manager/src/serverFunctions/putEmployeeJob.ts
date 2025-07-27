import { EmployeeJobReturn } from "@/types/EmployeeJob";
import axios from "axios";

export default async function putEmployeeJob(info: {
  employeeJobId: number;
  type: string;
  itemId: number;
}) {
  const result = await axios.put(`/api/employeeJob`, info);
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when updating an employeeJob");
  }
}

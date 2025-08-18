import axios from "axios";
import qs from "qs";

export default async function deleteEmployeeChar(data: {
  employeeId: number;
  charId: number;
}) {
  const result = await axios.delete<{ success: boolean }>(
    `/api/employeeChar?${qs.stringify(data)}`
  );
  const { success } = result.data;
  if (!success) {
    throw new Error("Something went wrong when Deleting the EmployeeChar");
  }
}

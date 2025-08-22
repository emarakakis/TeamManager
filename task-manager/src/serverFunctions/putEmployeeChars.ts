import axios from "axios";

export default async function putEmployeeChars(data: {
  employeeId: number;
  characteristics: number[];
}): Promise<void> {
  console.log("Data in putEmployeeChars: ", data);
  const result = await axios.put<{ success: boolean }>(
    "/api/employeeChars",
    data
  );

  const { success } = result.data;

  if (!success) {
    throw new Error("Something went wrong when Updating Chars of an Employee.");
  }
}

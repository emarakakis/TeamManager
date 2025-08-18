import { CharacteristicsReturn } from "@/types/Characteristics";
import axios from "axios";

export default async function getEmployeeChars(
  id: number,
  type: "view" | "add"
): Promise<CharacteristicsReturn[]> {
  const result = await axios.get<{
    success: boolean;
    employeeChars: CharacteristicsReturn[];
  }>(`/api/employeeChars?id=${id}&type=${type}`);

  const { success, employeeChars } = result.data;

  if (!success) {
    throw new Error("Something went wrong whe");
  }

  return employeeChars;
}

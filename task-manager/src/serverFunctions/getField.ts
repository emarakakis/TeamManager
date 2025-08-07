import { FieldDataCreate, FieldDataReturn } from "@/types/FieldData";
import axios from "axios";

export default async function getField(id: number): Promise<FieldDataReturn> {
  const result = await axios.get<{ field: FieldDataReturn; success: boolean }>(
    `/api/field?id=${id}`
  );
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when getting a field");
  }
  return data.field;
}

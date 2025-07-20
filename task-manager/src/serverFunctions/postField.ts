import axios from "axios";
import { FieldData } from "@/types/FieldData";
export default async function postField(field: FieldData) {
  const result = await axios.post("/api/field", field);
  const data = result.data;

  if (!data.success) {
    throw new Error("Insert didn't went good!");
  }

  return;
}

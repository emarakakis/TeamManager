import { FieldData } from "@/types/FieldData";
import axios from "axios";

export default async function putField(field: FieldData) {
  const res = await axios.put(`/api/field`, field);
  const data = await res.data;

  if (!data.success) {
    throw new Error("Error while updating a field");
  }
}

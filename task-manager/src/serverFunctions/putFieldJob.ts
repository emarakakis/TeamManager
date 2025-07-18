import { FieldJobReturn } from "@/types/FieldJob";
import axios from "axios";

export default async function putFieldJob(data: FieldJobReturn) {
  const result = await axios.put("/api/fieldJob", data);
  const d = result.data;

  if (!d) {
    throw new Error("Something went wrong when updating a FieldJob");
  }
}

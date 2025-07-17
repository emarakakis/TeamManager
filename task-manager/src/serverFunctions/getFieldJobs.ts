import axios from "axios";
import { FieldJobReturn } from "@/types/FieldJob";

export default async function getFieldJobs() {
  const result = await axios.get<{ data: FieldJobReturn[]; success: boolean }>(
    "/api/fieldJobs"
  );
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when getting FieldJobs");
  }

  return data.data;
}

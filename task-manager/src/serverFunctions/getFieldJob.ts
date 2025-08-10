import { FieldJobId, FieldJobReturn } from "@/types/FieldJob";
import axios from "axios";

export default async function getFieldJob(
  id: FieldJobId
): Promise<FieldJobReturn> {
  const { jobId, fieldId } = { ...id };
  const result = await axios.get<{
    fieldJob: FieldJobReturn;
    success: boolean;
  }>(`/api/fieldJob?jobId=${jobId}&fieldId=${fieldId}`);
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when getting a FieldJob");
  }

  return data.fieldJob;
}

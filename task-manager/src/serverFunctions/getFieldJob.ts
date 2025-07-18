import axios from "axios";

export default async function getFieldJob(id: {
  jobId: number;
  fieldId: number;
}) {
  const { jobId, fieldId } = { ...id };
  const result = await axios.get(
    `/api/fieldJob?jobId=${jobId}&fieldId=${fieldId}`
  );
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when getting a FieldJob");
  }

  return data.data;
}

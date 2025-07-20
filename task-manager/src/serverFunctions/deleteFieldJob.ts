import axios from "axios";

export default async function deleteFieldJob(id: {
  jobId: number;
  fieldId: number;
}) {
  const { jobId, fieldId } = { ...id };
  const result = await axios.delete(
    `/api/fieldJob?jobId=${jobId}&fieldId=${fieldId}`
  );

  const data = result.data;

  if (!data) {
    throw new Error("Something went wrong when Deleting a FieldJob");
  }
}

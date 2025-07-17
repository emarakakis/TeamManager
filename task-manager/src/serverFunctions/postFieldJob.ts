import axios from "axios";

export default async function postFieldJob(data: {
  jobId: string;
  fieldId: string;
}) {
  const result = await axios.post("/api/fieldJob", data);
  const ret = result.data;
  if (!ret.success) {
    throw new Error("Something went wrong when creating!");
  }

  const deleteJob = await axios.delete(`/api/job?id=${data.jobId}`);
}

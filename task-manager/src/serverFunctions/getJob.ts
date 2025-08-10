import { JobReturn } from "@/types/Job";
import axios from "axios";

export default async function getJob(id: number): Promise<JobReturn> {
  const result = await axios.get<{ job: JobReturn; success: boolean }>(
    `/api/job?id=${id}`
  );
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong while getting a Job");
  }

  return data.job;
}

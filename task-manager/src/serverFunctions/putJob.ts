import { JobReturn } from "@/types/Job";
import axios from "axios";

export default async function putJob(job: JobReturn) {
  const result = await axios.put("/api/job", job);
  const data = result.data;
  if (!data.success) {
    throw new Error("Something went wrong when Updating Job!");
  }
}

import axios from "axios";
import qs from "qs";
import { ObjectType } from "@/app/hooks/query-state-hook";
import { JobReturn } from "@/types/Job";

export default async function getJobs(jobSearchParam: ObjectType) {
  jobSearchParam["assigned"] = 0;
  const query = qs.stringify(jobSearchParam);
  const result = await axios.get<{ data: JobReturn[]; success: boolean }>(
    `/api/jobs?${query}`
  );
  const data = await result.data;

  if (!data.success || !Array.isArray(data.data)) {
    throw new Error("Something went wrong when fetching Jobs");
  }

  return data.data;
}

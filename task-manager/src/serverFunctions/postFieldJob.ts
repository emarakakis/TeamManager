import axios from "axios";
import getJob from "./getJob";
import postJob from "./postJob";

export default async function postFieldJob(data: {
  jobId: string;
  fieldId: string;
  keepFields: boolean;
}) {
  const { keepFields, ...ids } = data;

  if (keepFields) {
    const job = await getJob(Number(ids.jobId));
    const { id, ...rest } = job;
    const jobCreate = await postJob(rest);
  }

  const result = await axios.post("/api/fieldJob", ids);

  const ret = result.data;
  if (!ret.success) {
    throw new Error("Something went wrong when creating!");
  }
}

import axios from "axios";
import getJob from "./getJob";
import postJob from "./postJob";
import { FieldJobId } from "@/types/FieldJob";

export default async function postFieldJob(data: {
  fieldJobId: FieldJobId;
  keepFields: boolean;
}) {
  const { keepFields, fieldJobId } = data;

  if (keepFields) {
    const job = await getJob(fieldJobId.jobId);
    const { id, ...rest } = job;
    await postJob(rest);
  }

  const result = await axios.post("/api/fieldJob", fieldJobId);

  const ret = result.data;
  if (!ret.success) {
    throw new Error("Something went wrong when creating!");
  }
}

import axios from "axios";
import { FieldJobReturn } from "@/types/FieldJob";
import { ObjectType } from "@/app/hooks/query-state-hook";
import qs from "qs";

export default async function getFieldJobs(fieldJobQuery: ObjectType) {
  fieldJobQuery["assigned"] = 0;

  const query = qs.stringify(fieldJobQuery);
  const result = await axios.get<{
    fieldJobs: FieldJobReturn[];
    success: boolean;
  }>(`/api/fieldJobs?${query}`);
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when getting FieldJobs");
  }

  return data.fieldJobs;
}

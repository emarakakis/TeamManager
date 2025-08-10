import { FieldDataReturn } from "@/types/FieldData";
import axios from "axios";
import qs from "qs";
import { ObjectType } from "@/app/hooks/query-state-hook";

export default async function getFields(fieldSearchParams: ObjectType) {
  const query = qs.stringify(fieldSearchParams);
  const result = await axios.get<{
    fields: FieldDataReturn[];
    success: boolean;
  }>(`/api/fields?${query}`);
  const data = result.data;
  if (!Array.isArray(data.fields) || !data.success) {
    throw new Error("Smth went sideways");
  }

  return data.fields;
}

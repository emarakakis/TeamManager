import axios from "axios";

export default async function getField(id: number) {
  const result = await axios.get(`/api/field?id=${id}`);
  const data = await result.data;

  if (!data.success) {
    throw new Error("Something went wrong when getting a field");
  }
  return data.data;
}

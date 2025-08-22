import axios from "axios";

export default async function deleteField(id: number) {
  const result = await axios.delete(`/api/field?id=${id}`);
  const data = result.data;

  if (!data.success) {
    throw new Error("Something went wrong when deleting a Field!");
  }
}

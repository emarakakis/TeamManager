import axios from "axios";
import { DeleteFields } from "@/modules/ActionModal/RemoveItemModal/RemoveItemModal";

type FieldJobDeleteFields = Omit<DeleteFields, "fieldJob" | "employeeJob">;
type FieldJobId = {
  jobId: number;
  fieldId: number;
};

export default async function deleteFieldJob(input: {
  id: FieldJobId;
  fields: FieldJobDeleteFields;
}) {
  const { fields, id } = { ...input };
  const { jobId, fieldId } = { ...id };
  const fieldItems = Object.entries(fields);
  const deleteItems = fieldItems.filter(([key, val]) => val);
  const unAssignItems = fieldItems.filter(([key, val]) => !val);

  const result = await axios.delete(
    `/api/fieldJob?jobId=${jobId}&fieldId=${fieldId}`
  );

  const data = result.data;

  if (!data) {
    throw new Error("Something went wrong when Deleting a FieldJob");
  }

  for (const [key, value] of deleteItems) {
    try {
      const str = `${key}Id`;
      const itemId = id[str as keyof FieldJobId];
      const deleteItem = await axios.delete(`/api/${key}?id=${itemId}`);
      const deleteData = deleteItem.data;

      if (!deleteData.success) {
        throw new Error(`Something went wrong when deleting: ${key}`);
      }

      console.log(`Deleted: ${key}`);
    } catch (error) {
      throw error;
    }
  }

  for (const [key, value] of unAssignItems) {
    try {
      const str = `${key}Id`;
      const itemId = id[str as keyof FieldJobId];
      const getItem = await axios.get(`/api/${key}?id=${itemId}`);
      const oldItemData = getItem.data;
      if (!oldItemData.success) {
        throw new Error(`Something went wrong when getting: ${key}`);
      }
      const oldItem = oldItemData.data;
      const newItem = { ...oldItem, assigned: 0 };
      const putItem = await axios.put(`api/${key}`, newItem);
      const putItemData = putItem.data;

      if (!putItemData.success) {
        throw new Error(`Something went wrong when getting: ${key}`);
      }
    } catch (error) {
      throw error;
    }
  }
}

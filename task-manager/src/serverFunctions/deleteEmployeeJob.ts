import { EmployeeFields } from "@/modules/ActionModal/RemoveItemModal/ExtraConfirmation";
import axios from "axios";
import qs from "qs";
type wtf = {
  employeeId: number;
  jobId: number;
  fieldId: number;
};
export default async function deleteEmployeeJob(input: {
  deleteItem: {
    employeeId: number;
    jobId: number;
    fieldId: number;
  };
  fields: Record<string, boolean>;
}) {
  const { deleteItem, fields } = input;
  const deleteFields = Object.entries(fields).filter(([key, value]) => value);
  const unAssignFields = Object.entries(fields).filter(
    ([key, value]) => !value && key !== "field"
  );
  console.log(deleteItem);
  const query = qs.stringify(deleteItem);
  const result = await axios.delete(`/api/employeeJob?${query}`);

  deleteFields.forEach(async ([k, v]) => {
    const key = `${k}Id`;
    const id = deleteItem[key as keyof wtf];
    await axios.delete(`/api/${k}?id=${id}`);
  });

  unAssignFields.forEach(async ([k, v]) => {
    const key = `${k}Id`;
    const id = deleteItem[key as keyof wtf];
    const item = await axios.get(`/api/${k}?id=${id}`);
    const returnData = item.data;
    const newItem = { ...returnData.data, assigned: 0 };
    console.log(newItem);
    const unAssignItem = await axios.put(`/api/${k}`, newItem);
  });
}

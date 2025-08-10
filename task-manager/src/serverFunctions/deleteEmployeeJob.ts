import axios from "axios";
import qs from "qs";
type EmployeeJobId = {
  employeeId: number;
  jobId: number;
  fieldId: number;
};
export default async function deleteEmployeeJob(input: {
  deleteItem: EmployeeJobId;
  fields: Record<string, boolean>;
}) {
  const { deleteItem, fields } = input;
  fields.fieldJob = !!fields.fieldJob || !!fields.job || !!fields.field;
  const deleteFields = Object.entries(fields).filter(([key, value]) => value);
  const unAssignFields = Object.entries(fields).filter(
    ([key, value]) => !value && key !== "field"
  );
  const createNewJob = !fields.fieldJob && !fields.job;
  const query = qs.stringify(deleteItem);

  await axios.delete(`/api/employeeJob?${query}`);
  deleteFields.forEach(async ([k, v]) => {
    let q = "";
    if (k === "fieldJob") {
      q = qs.stringify({
        fieldId: deleteItem.fieldId,
        jobId: deleteItem.jobId,
      });
    } else {
      const key = `${k}Id`;
      const id = deleteItem[key as keyof EmployeeJobId];
      q = qs.stringify({ id: id });
    }
    await axios.delete(`/api/${k}?${q}`);
  });

  unAssignFields.forEach(async ([k, v]) => {
    const key = `${k}Id`;
    const id =
      k === "fieldJob"
        ? { jobId: deleteItem.jobId, fieldId: deleteItem.fieldId }
        : { id: deleteItem[key as keyof EmployeeJobId] };

    const item = await axios.get(`/api/${k}?${qs.stringify(id)}`);
    const returnData = item.data;

    if (k === "job" && createNewJob) {
      const { id, ...duplicateData } = returnData.job;
      duplicateData.assigned = 0;
      await axios.post(`/api/job`, duplicateData);
    } else {
      const newItem = { ...returnData.data, assigned: 0 };
      await axios.put(`/api/${k}`, newItem);
    }
  });
}

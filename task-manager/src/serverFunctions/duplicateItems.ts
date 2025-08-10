import getEmployee from "./getEmployee";
import getField from "./getField";
import getFieldJob from "./getFieldJob";
import getJob from "./getJob";
import postEmployee from "./postEmployee";
import postField from "./postField";
import postFieldJob from "./postFieldJob";
import postJob from "./postJob";

export default async function duplicateItems(
  id: number | { jobId: number; fieldId: number },
  type: string
): Promise<void> {
  if (type === "employee" && typeof id !== "object") {
    const { id: emplId, ...employee } = await getEmployee(id);
    return await postEmployee(employee);
  } else if (type === "field" && typeof id !== "object") {
    const { id: fldId, ...field } = await getField(id);
    return await postField(field);
  } else if (type === "job" && typeof id !== "object") {
    const { id: jbId, ...job } = await getJob(id);
    return await postJob(job);
  } else if (type === "fieldJob" && typeof id === "object") {
    const { jobId, fieldId } = id;
    const { id: jbId, ...job } = await getJob(jobId);
    const newId = await postJob(job);
    return await postFieldJob({
      fieldJobId: {
        jobId: newId,
        fieldId: fieldId,
      },
      keepFields: false,
    });
  } else {
    throw new Error("Wtf");
  }
}

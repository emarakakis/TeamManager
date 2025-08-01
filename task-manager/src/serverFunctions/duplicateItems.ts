import getEmployee from "./getEmployee";
import getField from "./getField";
import getFieldJob from "./getFieldJob";
import getJob from "./getJob";
import postEmployee from "./postEmployee";
import postField from "./postField";
import postFieldJob from "./postFieldJob";
import postJob from "./postJob";

export default async function duplicateItems(
  id: number | { jobId: string; fieldId: string },
  type: string
): Promise<void> {
  if (type === "employee") {
    const { id: emplId, ...employee } = await getEmployee(id);
    return await postEmployee(employee);
  } else if (type === "field") {
    const { id: fldId, ...field } = await getField(Number(id));
    console.log(field);
    return await postField(field);
  } else if (type === "job") {
    const { id: jbId, ...job } = await getJob(Number(id));
    return await postJob(job);
  } else if (type === "fieldJob") {
    const { jobId, fieldId } = id as { jobId: string; fieldId: string };
    const { id: jbId, ...job } = await getJob(Number(jobId));
    const newId = await postJob(job);
    return await postFieldJob({
      jobId: newId,
      fieldId: fieldId,
    });
  } else {
    throw new Error("Wtf");
  }
}

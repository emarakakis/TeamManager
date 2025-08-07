import { FieldJobId } from "@/types/FieldJob";
import deleteFieldJob from "./deleteFieldJob";
import getJob from "./getJob";
import postFieldJob from "./postFieldJob";
import putJob from "./putJob";

export default async function changeFieldJob(data: {
  newId: FieldJobId;
  previousId: FieldJobId;
}) {
  const { newId, previousId } = data;

  if (newId.jobId === previousId.jobId && newId.fieldId === previousId.fieldId)
    return;

  await deleteFieldJob({ id: previousId });
  await postFieldJob({ fieldJobId: newId, keepFields: false });

  if (newId.jobId !== previousId.jobId) {
    const job = await getJob(previousId.jobId);
    await putJob({ ...job, assigned: 0 });
  }
}

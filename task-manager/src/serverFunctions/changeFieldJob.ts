import deleteField from "./deleteField";
import deleteFieldJob from "./deleteFieldJob";
import getJob from "./getJob";
import postFieldJob from "./postFieldJob";
import putJob from "./putJob";

export default async function changeFieldJob(data: {
  newId: {
    jobId: number;
    fieldId: number;
  };
  previousId: {
    jobId: number;
    fieldId: number;
  };
}) {
  const { newId, previousId } = data;

  if (newId.jobId === previousId.jobId && newId.fieldId === previousId.fieldId)
    return;

  await deleteFieldJob({ id: previousId });

  const id = {
    jobId: newId.jobId.toString(),
    fieldId: newId.fieldId.toString(),
  };
  await postFieldJob(id);

  if (newId.jobId !== previousId.jobId) {
    const job = await getJob(previousId.jobId);
    const { jobId, ...rest } = job;
    await putJob({ ...rest, assigned: 0 });
  }
}

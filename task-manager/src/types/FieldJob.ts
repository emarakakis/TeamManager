export type FieldJob = {
  fieldName: string;
  jobName: string;
  profession: string;
  area: string;
};

export type FieldJobReturn = {
  jobId: number;
  fieldId: number;
} & FieldJob;

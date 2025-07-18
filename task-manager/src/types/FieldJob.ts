export type FieldJob = {
  fieldName: string;
  jobName: string;
  profession: string;
  jobFieldArea: string;
};

export type FieldJobReturn = {
  jobId: number;
  fieldId: number;
} & FieldJob;

export type FieldJob = {
  fieldName: string;
  jobName: string;
  profession: string;
  jobFieldArea: string;
};

export type FieldJobId = {
  jobId: number;
  fieldId: number;
};

export type FieldJobReturn = FieldJobId & FieldJob;

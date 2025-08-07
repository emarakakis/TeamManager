export type FieldJob = {
  fieldName: string;
  jobName: string;
  profession: string;
  area: string;
};

export type FieldJobId = {
  jobId: number;
  fieldId: number;
};

export type FieldJobAssignFields = keyof Pick<
  FieldJobReturn,
  "fieldName" | "jobName" | "profession" | "area"
>;

export type FieldJobDeleteFields = {
  job: boolean;
  field: boolean;
};

export type FieldJobReturn = FieldJobId & FieldJob;

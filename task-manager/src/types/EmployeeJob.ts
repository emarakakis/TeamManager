import { EmployeeReturn } from "./employee";
import { FieldDataReturn } from "./FieldData";
import { JobReturn } from "./Job";

export type EmployeeJobId = {
  employeeId: number;
  fieldId: number;
  jobId: number;
};

export type EmployeeJob = {
  employee: EmployeeReturn;
  field: FieldDataReturn;
  job: JobReturn;
};

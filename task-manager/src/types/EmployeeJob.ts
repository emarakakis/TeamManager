import { EmployeeReturn } from "./employee";
import { FieldDataReturn } from "./FieldData";
import { FieldJobDeleteFields } from "./FieldJob";
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

export type EmployeeJobReturn = {
  id: number;
} & EmployeeJob;

export type EmployeeJobDeleteFields = {
  employee: boolean;
} & FieldJobDeleteFields;

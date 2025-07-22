import { EmployeeReturn } from "./employee";
import { FieldDataReturn } from "./FieldData";
import { JobReturn } from "./Job";

export type EmployeeJob = {
  employee: EmployeeReturn;
  field: FieldDataReturn;
  job: JobReturn;
};

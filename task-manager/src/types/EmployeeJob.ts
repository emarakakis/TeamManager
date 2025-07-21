import { EmployeeReturn } from "./employee";
import { FieldDataReturn } from "./FieldData";
import { JobReturn } from "./Job";

export type EmployeeJob = {
  employee: Omit<EmployeeReturn, "sex" | "phoneNumber">;
  field: FieldDataReturn;
  job: JobReturn;
};

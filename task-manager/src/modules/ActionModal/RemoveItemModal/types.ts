import { EmployeeJobDeleteFields } from "@/types/EmployeeJob";
import { FieldJobDeleteFields } from "@/types/FieldJob";

export type DeleteFields =
  | { fieldJob: boolean }
  | EmployeeJobDeleteFields
  | FieldJobDeleteFields;

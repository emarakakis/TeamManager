export type EmployeeCreate = {
  name: string;
  surname: string;
  phoneNumber: string;
  sex: "male" | "female" | "undefined" | undefined;
  email: string;
};

export type EmployeeReturn = {
  id: number;
  assigned: number;
} & EmployeeCreate;

export const employeeDefault = {
  name: "",
  surname: "",
  phoneNumber: "",
  sex: undefined,
  email: "",
};

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

export type EmployeeAssignFields = keyof Pick<
  EmployeeReturn,
  "email" | "name" | "surname"
>;

export const employeeDefault = {
  name: "",
  surname: "",
  phoneNumber: "",
  sex: undefined,
  email: "",
};

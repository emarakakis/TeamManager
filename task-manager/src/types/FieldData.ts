export type FieldArea = "development" | "creative" | "production";

export type FieldDataCreate = {
  name: string;
  area: FieldArea;
};

export type FieldAssignFields = keyof Pick<FieldDataReturn, "name" | "area">;

export type FieldDataReturn = {
  id: number;
} & FieldDataCreate;

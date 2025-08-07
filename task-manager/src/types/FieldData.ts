export type FieldArea = "development" | "creative" | "production";

export type FieldDataCreate = {
  name: string;
  area: FieldArea;
};

export type FieldDataReturn = {
  id: number;
} & FieldDataCreate;

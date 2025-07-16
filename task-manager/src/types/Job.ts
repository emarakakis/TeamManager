import { FieldData } from "./FieldData";

export type JobCreate = {
  name: string;
  area: string;
  profession: Profession;
};

export type JobReturn = {
  id: number;
} & JobCreate;

type Profession = "intern" | "junior" | "intermediate" | "senior";

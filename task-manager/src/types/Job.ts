export type JobCreate = {
  name: string;
  area: string;
  profession: Profession;
};

export type JobReturn = {
  id: number;
  assigned: number;
} & JobCreate;

export type JobAssignFields = keyof Pick<
  JobReturn,
  "name" | "area" | "profession"
>;

type Profession = "intern" | "junior" | "intermediate" | "senior";

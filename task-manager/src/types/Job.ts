export type JobCreate = {
  name: string;
  area: string;
  profession: Profession;
};

export type JobReturn = {
  id: number;
  assigned: number;
} & JobCreate;

type Profession = "intern" | "junior" | "intermediate" | "senior";

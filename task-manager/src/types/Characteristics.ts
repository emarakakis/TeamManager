export type CharacteristicsCreate = {
  category: string;
  name: string;
};

export type CharacteristicsReturn = {
  id: number;
} & CharacteristicsCreate;

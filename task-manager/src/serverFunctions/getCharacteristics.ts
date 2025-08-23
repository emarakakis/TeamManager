import { CharacteristicsReturn } from "@/types/Characteristics";
import axios from "axios";

export default async function getCharacteristics(): Promise<
  CharacteristicsReturn[]
> {
  const result = await axios.get<{
    success: boolean;
    characteristics: CharacteristicsReturn[];
  }>("/api/characteristics");
  const data = result.data;
  if (!result.data) {
    throw new Error("Error while getting Characteristics");
  }

  return data.characteristics;
}

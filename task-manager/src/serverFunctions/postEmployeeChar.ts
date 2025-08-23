import {
  CharacteristicsCreate,
  CharacteristicsReturn,
} from "@/types/Characteristics";
import axios from "axios";

export default async function postCharacteristic(
  data: CharacteristicsCreate
): Promise<CharacteristicsReturn> {
  const result = await axios.post<{
    success: boolean;
    char: CharacteristicsReturn;
  }>(`/api/characteristic`, data);
  const { char, success } = result.data;

  if (!success) {
    throw new Error("Something went wrong when creating a new Characteristic");
  }

  return char;
}

import { FieldDataReturn } from "@/types/FieldData"
import axios from "axios"

export default async function getFields(){
    const result = await axios.get<FieldDataReturn[]>('/api/fields')
    const data = await result.data
    if (!Array.isArray(data)){
        throw new Error("Smth went sideways")
    }

    return data
}
import { FieldDataReturn } from "@/types/FieldData"
import axios from "axios"
import qs from 'qs'
import { ObjectType } from "@/app/hooks/query-state-hook";

export default async function getFields(fieldSearchParams: ObjectType){

    const query = qs.stringify(fieldSearchParams)
    const result = await axios.get<FieldDataReturn[]>(`/api/fields?${query}`)
    const data = await result.data
    if (!Array.isArray(data)){
        throw new Error("Smth went sideways")
    }

    return data
}
import { JobReturn } from "@/types/Job";
import axios from "axios";

export default async function getJob(id: number){
    const result = await axios.get(`/api/job?id=${id}`)
    const data = await result.data

    if (!data.success){
        throw new Error("Something went wrong while getting a Job")
    }

    return data.data
}
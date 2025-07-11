import { JobReturn } from "@/types/Job";
import axios from "axios";

export default async function getJobs(){
    const result = await axios.get('/api/jobs')
    const data = await result.data

    if(!data.success || !Array.isArray(data.data)){
        throw new Error("Something went wrong when fetching Jobs")
    }

    return data.data
}
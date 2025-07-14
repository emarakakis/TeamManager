import axios from "axios";

export default async function getJobs(query: string){
    const result = await axios.get(`/api/jobs?query=${query}`)
    const data = await result.data

    if(!data.success || !Array.isArray(data.data)){
        throw new Error("Something went wrong when fetching Jobs")
    }

    return data.data
}
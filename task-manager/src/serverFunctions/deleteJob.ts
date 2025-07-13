import axios from "axios";

export default async function deleteJob(id : number){
    const result = await axios.delete(`/api/job?id=${id}`)
    const data = await result.data
    if (!data.success){
        throw new Error("Something went wrong when Deleting a Job.")
    }

}
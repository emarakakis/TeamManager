import axios from "axios";
import { JobCreate } from "@/types/Job";

export default async function postJob(job: JobCreate){
    const result = await axios.post("/api/job", job)
    const data = await result.data

    if (!data.success){
        throw new Error("Error while creating a Job")
    }
}
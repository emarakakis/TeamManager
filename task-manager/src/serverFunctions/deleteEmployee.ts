import axios from "axios";

export default async function deleteEmployee(id: number){
    const result = await axios.delete(`/api/employee?id=${id}`)
    const data = await result.data

    if (!data.success){
        throw new Error("Something went wrong when deleting an Employee.")
    }
}
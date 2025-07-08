import { Employee } from "./employee"
import { FieldData } from "./FieldData"

export type Job = {
    name: string
    field: FieldData
    profession: Profession
    employee: Employee
}

type Profession = "intern" | "junior" | "intermediate" | "senior"
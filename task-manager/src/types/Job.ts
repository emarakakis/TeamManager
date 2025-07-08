import { Employee } from "./employee"
import { Field } from "./Field"

export type Job = {
    name: string
    field: Field
    profession: Profession
    employee: Employee
}

type Profession = "intern" | "junior" | "intermediate" | "senior"
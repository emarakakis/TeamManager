import { Employee } from "./employee"
import { FieldData } from "./FieldData"

export type JobCreate = {
    name: string
    field: FieldData
    profession: Profession
}

export type JobReturn = {
    id: number
    fieldId: number
} & Omit<JobCreate, "field">

type Profession = "intern" | "junior" | "intermediate" | "senior"
export type Employee = {
    id          : number
    name        : string
    surname     : string
    email       : string
    job         : Job
}

type JobFields = {
    field:"development" |"creative" | "production"
}
type JobTitle  = {
    title: "intern" | "junior" | "intermediate" | "senior" | "lead" | "director"
}

type Job = {
    field : JobFields
    title : JobTitle
    team : string
}

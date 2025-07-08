export type Employee = {
    name        : string
    surname     : string
    phoneNumber : string
    sex         : "male" | "female" | undefined
    email       : string
}

export const employeeDefault = {
    name: "",
    surname: "",
    phoneNumber: "",
    sex: undefined,
    email: ""
}

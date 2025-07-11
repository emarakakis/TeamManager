export type CharacteristicKey =
    | "concentration"
    | "logic"
    | "communication"
    | "creativity"
    | "collaboration"
    | "empathy"
    | "detailOrientation"
    | "problemSolving"
    | "timing"
    | "technicalSkill"
    | "patience"
    | "attentionToDetail"
    | "perseverance"
    | "languageMastery"
    | "researchSkill"
    | "storytelling";

export type CharacteristicValue = 
    "weak"
    |"low"
    |"medium"
    |"high"
    |"strong"


export type EmployeeCharacteristic = {
    key: CharacteristicKey
    value: CharacteristicValue
}

export type FieldArea = "development" | "creative" | "production"

export type FieldData = {
    name: string
    area: FieldArea
}

export type FieldDataReturn = {
    id: number
} & FieldData
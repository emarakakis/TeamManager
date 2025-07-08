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

export type Field = {
    name: string
    area: FieldArea
    chars : EmployeeCharacteristic[]
}

export const fields: Field[] = [
  {
    name: "Developer",
    area: "development",
    chars: [
      { key: "concentration", value: "high" },
      { key: "logic", value: "strong" },
      { key: "communication", value: "medium" },
      { key: "creativity", value: "medium" },
      { key: "collaboration", value: "medium" }
    ]
  },
  {
    name: "UX Designer",
    area: "creative",
    chars: [
      { key: "creativity", value: "high" },
      { key: "empathy", value: "high" },
      { key: "detailOrientation", value: "medium" },
      { key: "communication", value: "high" },
      { key: "problemSolving", value: "medium" }
    ]
  },
  {
    name: "Video Editor",
    area: "production",
    chars: [
      { key: "creativity", value: "high" },
      { key: "timing", value: "strong" },
      { key: "technicalSkill", value: "high" },
      { key: "patience", value: "medium" },
      { key: "attentionToDetail", value: "high" }
    ]
  },
  {
    name: "QA Engineer",
    area: "development",
    chars: [
      { key: "attentionToDetail", value: "high" }, // άλλαξα από "very high" σε "high"
      { key: "logic", value: "strong" },
      { key: "perseverance", value: "high" },
      { key: "communication", value: "medium" },
      { key: "problemSolving", value: "high" }
    ]
  },
  {
    name: "Copywriter",
    area: "creative",
    chars: [
      { key: "creativity", value: "high" },
      { key: "languageMastery", value: "strong" },
      { key: "empathy", value: "medium" },
    ]
  }
]

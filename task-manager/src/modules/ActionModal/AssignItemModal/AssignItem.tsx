import { EmployeeAssignFields, EmployeeReturn } from "@/types/employee";
import { Box, Typography } from "@mui/material";
import { FieldJobAssignFields, FieldJobReturn } from "@/types/FieldJob";
import { FieldAssignFields, FieldDataReturn } from "@/types/FieldData";
import { JobAssignFields, JobReturn } from "@/types/Job";
import { useEffect } from "react";

const employeeFields: EmployeeAssignFields[] = ["name", "surname", "email"];
const fieldJobFields: FieldJobAssignFields[] = [
  "fieldName",
  "jobName",
  "profession",
  "area",
];
const jobFields: JobAssignFields[] = ["name", "area", "profession"];
const fieldFields: FieldAssignFields[] = ["name", "area"];

type AssignItemData =
  | EmployeeReturn
  | FieldJobReturn
  | FieldDataReturn
  | JobReturn;

export default function AssignItem({ data }: { data: AssignItemData }) {
  const [name, validItems] = getItemData(data);
  const length = validItems?.length;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f5f5f5",
        borderRadius: "16px",
        padding: 2,
        rowGap: 2,
        width: "90%",
        height: "90%",
      }}
    >
      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: 600,
          color: "dimgray",
        }}
      >
        {name}
      </Typography>
      {validItems!.map(([k, value], index) => (
        <Typography key={index}>
          {k}:{value as string}
        </Typography>
      ))}
    </Box>
  );
}

function getItemData(data: AssignItemData): [string, Array<[string, any]>] {
  if ("email" in data) {
    return [
      "Employee",
      Object.entries(data).filter(([key]) =>
        employeeFields.includes(key as EmployeeAssignFields)
      ),
    ];
  } else if ("jobId" in data && "fieldId" in data)
    return [
      "FieldJob",
      Object.entries(data).filter(([key]) =>
        fieldJobFields.includes(key as FieldJobAssignFields)
      ),
    ];
  else if ("profession" in data && !("jobId" in data))
    return [
      "Job",
      Object.entries(data).filter(([key]) =>
        jobFields.includes(key as JobAssignFields)
      ),
    ];
  else
    return [
      "Field",
      Object.entries(data).filter(([key]) =>
        fieldFields.includes(key as FieldAssignFields)
      ),
    ];
}

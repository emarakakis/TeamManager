import { EmployeeReturn } from "@/types/employee";
import { Box, DialogTitle, Typography, Button } from "@mui/material";
import { FieldJobReturn } from "@/types/FieldJob";

const employeeFields = ["name", "surname", "email"];
const fieldJobFields = ["fieldName", "jobName", "profession", "area"];
const jobFields = ["name", "area", "profession"];
const fieldFields = ["name", "area"];

export default function AssignItem({
  data,
}: {
  data: EmployeeReturn | FieldJobReturn;
}) {
  const items = Object.entries(data);
  const [name, validItems] = getItemData(items);
  console.log(validItems);
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

function getItemData(
  data: Array<[string, any]>
): [string, Array<[string, any]>] {
  if (data.some(([key]) => key === "email"))
    return ["Employee", data.filter(([key]) => employeeFields.includes(key))];
  else if (
    data.some(([key]) => key === "jobId") &&
    data.some(([key]) => key === "fieldId")
  )
    return ["FieldJob", data.filter(([key]) => fieldJobFields.includes(key))];
  else if (data.some(([key]) => key === "profession"))
    return ["Job", data.filter(([key]) => jobFields.includes(key))];
  else return ["Field", data.filter(([key]) => fieldFields.includes(key))];
}

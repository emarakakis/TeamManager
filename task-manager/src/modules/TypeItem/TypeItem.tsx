import { EmployeeReturn } from "@/types/employee";
import { FieldDataReturn } from "@/types/FieldData";
import { JobReturn } from "@/types/Job";
import ItemModal from "../ItemModal/ItemModal";
import { Grid, Typography } from "@mui/material";
import { FieldJobReturn } from "@/types/FieldJob";

type TypeItemProps =
  | EmployeeReturn
  | JobReturn
  | FieldDataReturn
  | FieldJobReturn;

export default function TypeItem<T extends TypeItemProps>({
  data,
  type,
  index,
}: {
  data: T;
  type: string;
  index: number;
}) {
  let items = Object.entries(data);
  items = items.filter(
    ([key, _]) => key !== "id" && key !== "jobId" && key !== "fieldId"
  );
  const dataLength = items.length + 1;
  const itemSize = 12 / dataLength;

  console.log(items);
  return (
    <Grid
      container
      sx={{ background: index % 2 === 0 ? "#1976d2" : "white", width: 1 }}
    >
      {items.map(([_, value], index) => {
        return (
          <Grid size={itemSize} key={index}>
            <Typography>{value}</Typography>
          </Grid>
        );
      })}
      <Grid size={itemSize} container sx={{ justifyContent: "end", pr: 1 }}>
        <ItemModal data={data} type={type} />
      </Grid>
    </Grid>
  );
}

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
    ([key, _]) =>
      key !== "id" && key !== "jobId" && key !== "fieldId" && key !== "assigned"
  );
  const dataLength = items.length;
  const itemSize = 12 / dataLength;

  return (
    <Grid
      sx={{
        display: "grid",
        gridTemplateColumns: "14fr 1fr",
        mt: 1,
        gap: "5px",
      }}
    >
      <Grid
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${dataLength},1fr)`,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "16px",
          background: index % 2 === 0 ? "#1976d2" : "white",
          minWidth: `${dataLength * 180}px`,
          minHeight: "40px",
          width: "100%",
        }}
      >
        {items.map(([_, value], index) => {
          return (
            <Grid
              key={index}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <Typography>{value}</Typography>
            </Grid>
          );
        })}
      </Grid>
      <Grid
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
          borderRadius: "16px",
        }}
      >
        <ItemModal data={data} type={type} />
      </Grid>
    </Grid>
  );
}

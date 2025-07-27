import { Grid, Box, Typography } from "@mui/material";
import ItemModal, { ModalItem } from "../ItemModal/ItemModal";
import { EmployeeReturn } from "@/types/employee";
import { JobReturn } from "@/types/Job";
import { FieldDataReturn } from "@/types/FieldData";
import RowModal from "./RowModal/RowModal";
import { EmployeeJobId } from "@/types/EmployeeJob";

export default function RowItem<
  T extends EmployeeReturn | JobReturn | FieldDataReturn
>({
  data,
  type,
  employeeJobId,
}: {
  data: T;
  type: string;
  employeeJobId: number;
}) {
  const items = Object.entries(data).filter(([key, value]) => key !== "id");

  return (
    <Box
      sx={{
        display: "grid",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ebebeb",
        borderRadius: "8px",
        gridTemplateColumns: "2fr 1fr",
      }}
    >
      <Grid container direction={"column"}>
        {items.map(([key, value]) => (
          <Grid container key={key} sx={{ justifyContent: "center" }}>
            <Typography>{value}</Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container sx={{ justifyContent: "center" }}>
        <RowModal type={type} id={data.id} ejId={employeeJobId} />
      </Grid>
    </Box>
  );
}

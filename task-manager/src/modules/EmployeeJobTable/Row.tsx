import { EmployeeJob } from "@/types/EmployeeJob";
import { Box, Grid, Typography } from "@mui/material";
import ItemModal from "../ItemModal/ItemModal";
import RowItem from "./RowItem";
import EditEmployeeJobModal from "../EditEmployeeJobModal/EditEmployeeJobModal";
export default function Row({ data }: { data: EmployeeJob }) {
  const { employee, job, field } = data;

  return (
    <Grid
      container
      columns={4}
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(4,10fr) 1fr",
        gap: 2,
        height: "150px",
        backgroundColor: "#e8e8e8",
        borderRadius: "8px",
        padding: 1,
      }}
    >
      <RowItem data={employee} type={"employee"} />
      <RowItem data={field} type={"field"} />
      <RowItem data={job} type={"job"} />
      <RowItem data={job} type={"job"} />
      <EditEmployeeJobModal data={data} />
    </Grid>
  );
}

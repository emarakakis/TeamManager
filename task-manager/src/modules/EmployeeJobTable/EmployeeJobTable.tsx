"use client";
import getEmployeeJobs from "@/serverFunctions/getEmployeeJobs";
import { EmployeeJob } from "@/types/EmployeeJob";
import { Box, Grid, List, ListItem, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Row from "./Row";

export default function EmployeeJobTable() {
  const { data, isLoading } = useQuery<EmployeeJob[]>({
    queryKey: ["employeeJobs"],
    queryFn: getEmployeeJobs,
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Grid
      container
      direction={"column"}
      sx={{
        margin: 2,
        gap: 2,
        backgroundColor: "#f5f5f5",
        padding: 4,
        borderRadius: "16px",
      }}
    >
      <Grid
        container
        columns={4}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 2,
          justifyContent: "center",
          backgroundColor: "#e8e8e8",
          borderRadius: "8px",
          padding: 1,
        }}
      >
        <Grid container sx={{ justifyContent: "center" }}>
          <Typography>Employee</Typography>
        </Grid>
        <Grid container sx={{ justifyContent: "center" }}>
          <Typography>Field</Typography>
        </Grid>
        <Grid container sx={{ justifyContent: "center" }}>
          <Typography>Job</Typography>
        </Grid>
        <Grid container sx={{ justifyContent: "center" }}>
          <Typography>Tasks</Typography>
        </Grid>
      </Grid>

      {data?.map((item, index) => (
        <Row data={item} key={index} />
      ))}
    </Grid>
  );
}

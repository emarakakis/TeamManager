"use client";

import EmployeeTable from "@/modules/EmployeeTable/EmployeeTable";
import { Grid, Box, List, ListItem } from "@mui/material";

import FieldTable from "@/modules/FieldTable/FieldTable";
import JobTable from "@/modules/JobTable/JobTable";
import FieldJobTable from "@/modules/FieldJobTable/FieldJobTable";

let gridSx = { justifyContent: "center" };

export default function Home() {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(2,1fr)",
        gridTemplateRows: "repeat(2,1fr)",
        mt: 1,
        gap: 2.8,
        width: "100%",
        height: "100%",
      }}
    >
      <EmployeeTable />
      <FieldTable />
      <FieldJobTable />
      <JobTable />
    </Box>
  );
}

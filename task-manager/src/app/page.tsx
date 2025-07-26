"use client";

import EmployeeTable from "@/modules/EmployeeTable/EmployeeTable";
import { Grid, Box, List, ListItem } from "@mui/material";

import FieldTable from "@/modules/FieldTable/FieldTable";
import JobTable from "@/modules/JobTable/JobTable";
import FieldJobTable from "@/modules/FieldJobTable/FieldJobTable";

let gridSx = { justifyContent: "center" };

export default function Home() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
      <Grid sx={{ justifyContent: "right", width: 0.5, ml: 5 }}>
        <EmployeeTable />
        <FieldJobTable />
      </Grid>
      <Box sx={{ width: 0.4, mr: 5 }}>
        <Grid>
          <FieldTable />
          <JobTable />
        </Grid>
      </Box>
    </Box>
  );
}

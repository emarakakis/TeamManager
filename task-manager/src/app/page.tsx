"use client";

import EmployeeTable from "@/modules/EmployeeTable/EmployeeTable";
import { Grid, Box } from "@mui/material";

import FieldTable from "@/modules/FieldTable/FieldTable";
import EditItemDrawer from "@/modules/EditItemDrawer/EditItemDrawer";
import ActionModal from "@/modules/ActionModal/ActionModal";
import JobTable from "@/modules/JobTable/JobTable";
import { useQueryState } from "./hooks/query-state-hook";
import qs from "qs";
let tableSx = {
  border: "1px solid darkgray",
  borderRadius: "16px",
  backgroundColor: "#f5f5f5",
  color: "black",
  padding: 1,
};
let gridSx = { justifyContent: "center" };

export default function Home() {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
      <Box sx={{ justifyContent: "right", width: 0.5, ml: 5 }}>
        <Grid sx={gridSx}>
          <EmployeeTable sx={tableSx} />
        </Grid>
      </Box>
      <Box sx={{ width: 0.4, mr: 5 }}>
        <Grid
          container
          sx={{ justifyContent: "space-between", flexDirection: "row" }}
        >
          <FieldTable
            sx={{
              border: "1px solid darkgray",
              borderRadius: "16px",
              width: 0.5,
              backgroundColor: "#f5f5f5",
              color: "black",
              padding: 1,
            }}
          />
          <JobTable
            sx={{
              border: "1px solid darkgray",
              borderRadius: "16px",
              width: 0.4,
              backgroundColor: "#f5f5f5",
              color: "black",
              padding: 1,
            }}
          />
        </Grid>
      </Box>
      <EditItemDrawer />
      <ActionModal />
    </Box>
  );
}

"use client";

import EmployeeJobTable from "@/modules/EmployeeJobTable/EmployeeJobTable";
import EmployeeJobSearch from "@/modules/Search/EmployeeJobSearch";
import { Box } from "@mui/material";

export default function Page() {
  return (
    <>
      <Box
        sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}
      >
        <EmployeeJobSearch />
      </Box>
      <EmployeeJobTable />
    </>
  );
}

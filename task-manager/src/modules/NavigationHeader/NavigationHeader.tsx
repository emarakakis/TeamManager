import * as React from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
export default function NavigationHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            <NextLink href="/">
              <Button variant="text" sx={{ color: "white" }}>
                GameDev CEO
              </Button>
            </NextLink>
          </Typography>
          <Box>
            <NextLink href="/pages/employeeJobs">
              <Button variant="text" sx={{ color: "white" }}>
                EmployeesJobs
              </Button>
            </NextLink>
            <NextLink href="/pages/jobs/create">
              <Button variant="text" sx={{ color: "white" }}>
                Create Job
              </Button>
            </NextLink>
            <NextLink href="/pages/fields/create">
              <Button variant="outlined" sx={{ color: "white" }}>
                Create Field
              </Button>
            </NextLink>
            <NextLink href="/pages/employees/create">
              <Button variant="outlined" sx={{ color: "white" }}>
                Create Employee
              </Button>
            </NextLink>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Κενό για να μην καλύπτεται το περιεχόμενο */}
      <Toolbar />

      <Box>{children}</Box>
    </>
  );
}

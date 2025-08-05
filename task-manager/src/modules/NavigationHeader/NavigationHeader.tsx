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
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Fixed AppBar */}
      <AppBar
        position="fixed"
        color="primary"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" component="div">
            <NextLink href="/" passHref>
              <Button variant="text" sx={{ color: "white" }}>
                GameDev CEO
              </Button>
            </NextLink>
          </Typography>
          <Box>
            <NextLink href="/pages/employeeJobs" passHref>
              <Button variant="text" sx={{ color: "white" }}>
                EmployeesJobs
              </Button>
            </NextLink>
            <NextLink href="/pages/jobs/create" passHref>
              <Button variant="text" sx={{ color: "white" }}>
                Create Job
              </Button>
            </NextLink>
            <NextLink href="/pages/fields/create" passHref>
              <Button variant="outlined" sx={{ color: "white" }}>
                Create Field
              </Button>
            </NextLink>
            <NextLink href="/pages/employees/create" passHref>
              <Button variant="outlined" sx={{ color: "white" }}>
                Create Employee
              </Button>
            </NextLink>
          </Box>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Box>{children}</Box>
    </Box>
  );
}

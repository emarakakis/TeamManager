"use client";
import getEmployeeJobs from "@/serverFunctions/getEmployeeJobs";
import { EmployeeJob } from "@/types/EmployeeJob";
import { Box, Grid, List, ListItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

export default function EmployeeJobTable() {
  const { data, isLoading } = useQuery<EmployeeJob[]>({
    queryKey: ["employeeJobs"],
    queryFn: getEmployeeJobs,
  });

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  return (
    <List>
      {data?.map((item, index) => {
        return <ListItem key={index}>{item.employee.email}</ListItem>;
      })}
    </List>
  );
}

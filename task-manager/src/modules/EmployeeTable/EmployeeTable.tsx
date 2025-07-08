import { useQuery } from "@tanstack/react-query";
import { Employee } from "@/types/employee";
import EmployeeItem from "@/modules/EmployeeItem/EmployeeItem";
import getEmployees from "@/serverFunctions/getEmployees";
import { Grid, Typography } from "@mui/material";

export default function EmployeeTable(){
      const {data} = useQuery<Employee[]>({
        queryKey: ['employees'],
        queryFn: getEmployees
  })
  return(
    <Grid sx={{border:"2px solid"}}>
        <Grid container spacing={2} sx={{background:"white"}}>
            <Grid size={2.4}>
                <Typography>Name</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>Surname</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>Phone Number</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>Sex</Typography>
            </Grid>
            <Grid size={2.4}>
                <Typography>Email</Typography>
            </Grid>
        </Grid>
        
        {data && data.map((employee, index) => {
        return (
            <EmployeeItem key={index + 1} colorIndex={index} data={employee}/>
        )
        })}
    </Grid>
  )
}
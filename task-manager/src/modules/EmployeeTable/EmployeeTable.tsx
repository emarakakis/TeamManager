import { useQuery } from "@tanstack/react-query";
import { Employee } from "@/types/employee";
import EmployeeItem from "@/modules/EmployeeItem/EmployeeItem";
import getEmployees from "@/serverFunctions/getEmployees";
import { Grid } from "@mui/material";
import TableHeader from "./TableHeader";
import { useQueryState } from "@/app/hooks/query-state-hook";

export default function EmployeeTable(){
    const [searchEmployee, setSearchEmployee] = useQueryState('employee')
    const {data} = useQuery<Employee[]>({
        queryKey: ['employees', searchEmployee],
        queryFn: () => getEmployees(searchEmployee)
  })
  return(
    <Grid sx={{border:"1px solid darkgray", justifyContent:"center", borderRadius: '16px', backgroundColor:'#f5f5f5',  color:'black', width:1, padding:3}}>
        <TableHeader/>
        {data && data.map((employee, index) => {
        return (
            <EmployeeItem key={index + 1} colorIndex={index} data={employee}/>
        )
        })}
    </Grid>
  )
}
import { useQuery } from "@tanstack/react-query";
import { Employee, EmployeeReturn } from "@/types/employee";
import EmployeeItem from "@/modules/EmployeeItem/EmployeeItem";
import getEmployees from "@/serverFunctions/getEmployees";
import { Grid, Typography } from "@mui/material";
import Search from "../Search/Search";
import TableHeader from "./TableHeader";
import { useQueryState } from "@/app/hooks/query-state-hook";

export default function EmployeeTable({...props}){
    const [searchEmployee, setSearchEmployee] = useQueryState('employee')
    const {data} = useQuery<EmployeeReturn[]>({
        queryKey: ['employees', searchEmployee],
        queryFn: () => getEmployees(searchEmployee)
  })
  return(
    <Grid {...props}>
      <Grid container direction="row" sx ={{alignItems:'center'}}>
          <Grid container sx={{backgroundColor:'lightGray', justifyContent:'center', alignItems:'center', height:"100px", width:"30%", borderRadius:"16px"}}>
            <Typography variant="h2" sx={{justifyContent:"center"}}>Employees</Typography>
          </Grid>
          <Grid size={9} container sx={{justifyContent:'center', alignItems:'center', height:"100px", width:"70%", borderRadius:"16px"}}>
            <Search type="employee" options = {[
              {key: 'name', value: 'Name'},
              {key: 'surname', value:'Surname'},
              {key: 'phoneNumber', value: 'Phone Number'},
              {key: 'sex', value: 'Sex'}]}/>
          </Grid>
      </Grid>
      <hr/>
      <TableHeader/>
        <hr/>
        {data && data.map((employee, index) => {
        return (
            <EmployeeItem key={index + 1} colorIndex={index} data={employee}/>
        )
        })}
    </Grid>
  )
}
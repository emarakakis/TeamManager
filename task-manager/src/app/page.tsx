"use client"

import EmployeeTable from "@/modules/EmployeeTable/EmployeeTable"
import { Grid, TextField } from "@mui/material"
import Input from "@/modules/Input/Input"

export default function Home() {
  
  return(
    <Grid  sx={{justifyContent:"center", }}>
        <Grid container sx={{justifyContent:"center", margin:2}}>
          <Input/>
        </Grid>
        <Grid>
          <EmployeeTable/>
        </Grid>
    </Grid>)
}

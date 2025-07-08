"use client"

import EmployeeTable from "@/modules/EmployeeTable/EmployeeTable"
import { Grid } from "@mui/material"
import Input from "@/modules/Input/Input"
import FieldTable from "@/modules/FieldTable/FieldTable"

export default function Home() {
  
  return(
    <Grid  sx={{justifyContent:"center", }}>
        <Grid container sx={{justifyContent:"center", margin:2}}>
          <Input/>
        </Grid>
        <Grid>
          <EmployeeTable sx={{border:"1px solid darkgray", justifyContent:"center", borderRadius: '16px', backgroundColor:'#f5f5f5',  color:'black', width:1, padding:3}}/>
          <FieldTable sx={{border:"1px solid darkgray", justifyContent:"center", borderRadius: '16px', backgroundColor:'#f5f5f5',  color:'black', width:1, padding:3}} />
        </Grid>
    </Grid>)
}

"use client"

import EmployeeTable from "@/modules/EmployeeTable/EmployeeTable"
import { Grid } from "@mui/material"
import Input from "@/modules/Input/Input"
import FieldTable from "@/modules/FieldTable/FieldTable"

let tableSx = {border:"1px solid darkgray", justifyContent:"center", borderRadius: '16px', backgroundColor:'#f5f5f5',  color:'black', width:1, padding:3}
let gridSx = {justifyContent:"center", margin:2}

export default function Home() {
  
  return(
    <Grid  sx={{justifyContent:"center"}}>
      <Grid container sx={gridSx}>
        <Input/>
      </Grid>
      <Grid sx={gridSx}>
        <EmployeeTable sx={tableSx}/>
      </Grid>
      <Grid sx={gridSx}>
        <FieldTable sx= {tableSx}/>
      </Grid>
    </Grid>)
}

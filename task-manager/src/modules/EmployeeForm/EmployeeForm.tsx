"use client"

import { 
    Box,
    Button,
    TextField,
    Grid, 
    Container, 
    SelectChangeEvent, 
    Typography} from "@mui/material";

import SelectControl from "./SelectControl";
import { useFormContext } from "react-hook-form";
import { Employee } from "@/types/employee";
import { useState } from "react";

export default function EmployeeForm() {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();

  return (
      <Container sx={{border:'2px solid gray', borderRadius:"15px", width:"0.5", justifyContent:"center"}}>
        <Grid container sx={{justifyContent:"center", marginTop:2, marginBottom:2}} spacing={1}>
          <Typography variant="h2">Add Employee</Typography>
        </Grid>
        <Grid direction={"column"} spacing={2}>
            <Grid container sx={{justifyContent:"center", marginTop:2, marginBottom:2}} spacing={1}>
                <TextField label="Name" {...register("name")} />
                <TextField label="Surname" {...register("surname")} />
            </Grid>
            <Grid container sx={{justifyContent:"center", marginTop:2, marginBottom:2}} spacing={1}>
                <TextField label="Phone-Number" {...register("phoneNumber")} />
                <SelectControl 
                  control={control}
                  options={[{key:"male", value:"Male"}, {key: "female", value:"Female"}, {key:"undefined", value:"Undefined"}]}
                  name="sex"/>
            </Grid>
            <Grid container sx={{justifyContent:"center", marginTop:2, marginBottom:2}} spacing={1}>
                <TextField label="City" {...register("city")} />
                <TextField label="email" {...register("email")}/>
            </Grid>
            <Grid container sx={{justifyContent:"center", marginTop:2, marginBottom:2}}>
              <Button variant="contained" type="submit">Submit</Button>
            </Grid>
        </Grid>
        
      </Container>
    
  );
}

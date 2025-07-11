import { Grid, Typography, TextField } from "@mui/material"
import SelectControl from "../EmployeeForm/SelectControl"
import { EmployeeReturn } from "@/types/employee"
import { useFormContext } from "react-hook-form"
import { useQuery } from "@tanstack/react-query"
import { useQueryState } from "@/app/hooks/query-state-hook"
import getEmployee from "@/serverFunctions/getEmployee";

export default function EditEmployee(){

    const {register, getValues, control} = useFormContext<EmployeeReturn>()
    console.log(getValues())
    return(
        <Grid sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
            <input type="hidden" {...register('id')}/>
            <Grid container sx={{justifyContent:'center'}}>
                <Typography variant="h2">Edit Employee</Typography>
            </Grid>
            <Grid container spacing={2} sx={{mt:2}}>
                <TextField label="Name"{...register('name')}/>
                <TextField label="Surname"{...register('surname')}/>
            </Grid>
            <Grid container spacing={2} sx={{mt:2}}>
                <TextField label="Phone Number" {...register('phoneNumber')}/>
                <SelectControl<EmployeeReturn>
                    control={control}
                    options={[
                        {key:"male", value:"Male"},
                        {key: "female", value:"Female"},
                        {key:"undefined", value:"Undefined"}]}
                    name="sex"/>
            </Grid>
            <Grid container spacing={5} sx={{mt:2, justifyContent:"center"}}>
                <TextField label="Email" {...register('email')}/>
            </Grid>
        </Grid>
    )
}
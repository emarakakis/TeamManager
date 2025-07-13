import { Grid, TextField, Typography, Box, Button } from "@mui/material"
import RadioSelect from "../FieldForm/RadioSelect"
import { useFormContext } from "react-hook-form"
import { JobCreate } from "@/types/Job"

export default function JobForm(){

    const {register, control} = useFormContext<JobCreate>()

    return (
    <Box sx={{display:"flex", justifyContent:"center"}}>
        <Grid sx={{border:"1px solid", width:0.5}}>
            <Typography variant="h2" sx={{display:"flex", justifyContent:"center"}}>Create Job</Typography>
            <Grid container sx={{justifyContent:"center"}}>
                <TextField label="Job Name" {...register("name")}/>
            </Grid>
            <Grid container sx={{justifyContent:"center"}}>
                <RadioSelect
                    control={control}
                    name="profession"
                    row={true}
                    defaultValue="intern"
                    radios={[
                        {key:"intern", value:"intern", label:"Intern"},
                        {key:"junior", value:"junior", label:"Junior"},
                        {key:"intermediate", value:"intermediate", label:"Intermediate"},
                        {key:"senior", value:"senior", label:"senior"}
                        ]}
                    />
            </Grid>
            <Grid container sx={{justifyContent:"center"}}>
                <Button type="submit">Submit</Button>
            </Grid>
        </Grid>
    </Box>
    )

}
import { JobReturn } from "@/types/Job";
import { Grid, Typography, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import RadioSelect from "../FieldForm/RadioSelect";
import { watch } from "fs";

export default function EditJob({data} : {data: JobReturn}){
    const {register, getValues, watch, control} = useFormContext<JobReturn>()
    return (
        <Grid>
        <Typography variant="h2" sx={{display:"flex", justifyContent:"center"}}>Create Job</Typography>
                    <Grid container sx={{justifyContent:"center"}}>
                        <TextField label="Job Name" {...register("name")}/>
                    </Grid>
                    <Grid container sx={{justifyContent:"center"}}>
                        <RadioSelect
                            control={control}
                            name="profession"
                            row={true}
                            defaultValue={data.profession}
                            radios={[
                                {key:"intern", value:"intern", label:"Intern"},
                                {key:"junior", value:"junior", label:"Junior"},
                                {key:"intermediate", value:"intermediate", label:"Intermediate"},
                                {key:"senior", value:"senior", label:"senior"}
                                ]}
                            />
                    </Grid>
                    </Grid>)
    
}
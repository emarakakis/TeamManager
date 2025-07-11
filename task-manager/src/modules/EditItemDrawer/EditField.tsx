import { useFormContext } from "react-hook-form";
import RadioSelect from "../FieldForm/RadioSelect";
import { FieldDataReturn } from "@/types/FieldData";
import { Grid, Typography, TextField } from "@mui/material";

export default function EditField({data}:{data:FieldDataReturn} ){
    const {register, watch, getValues, control} = useFormContext<FieldDataReturn>()

    console.log(getValues('area'))

    return (
        
        <Grid>
            <Typography sx={{justifyContent:"center", display:"flex"}}variant="h2">Edit Field</Typography>
            <Grid>
                <RadioSelect<Exclude<FieldDataReturn,"id">>
                    name="area"
                    control={control}
                    defaultValue={!!data.area ? data.area : undefined}
                    row = {true}
                    radios={[
                        {key:"development", value:"development", label:"Development"},
                        {key:"creative", value:"creative", label:"Creative"},
                        {key:"production", value:"production", label:"Production"},
                    ]}
                />
            </Grid>
            <Grid container sx = {{justifyContent: "center"}}>
                <TextField label="Name of Field" type="text" {...register('name')}/>
            </Grid>
        </Grid>
        
    )
}

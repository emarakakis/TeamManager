import { useFormContext } from "react-hook-form"
import { Grid, Box, TextField, Button} from "@mui/material"
import RadioSelect from "./RadioSelect"
import { FieldData } from "@/types/FieldData"

export default function FieldForm(){
    const {register, control} = useFormContext<FieldData>()

    return (
        <Box display="flex" justifyContent="center">
            <Grid  container direction="column" sx = {{justifyContent: "center", border:"2px solid", borderRadius:"16px",  width:"40%", }}>
                <Grid container sx = {{justifyContent: "center"}}>
                    <RadioSelect<FieldData>
                        name="area"
                        control={control}
                        row = {true}
                        defaultValue="development"
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
                <Grid container sx = {{justifyContent: "center"}}>
                    <Button type="submit">Submit</Button>
                </Grid>
            </Grid>
        </Box>
    )
}
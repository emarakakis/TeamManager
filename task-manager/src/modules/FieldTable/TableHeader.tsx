import { Grid, Typography } from "@mui/material"

export default function TableHeader(){
return(            
    <Grid container sx={{backgroundColor:"white"}}>
        <Grid size={6}>
            <Typography>Area</Typography>
        </Grid>
        <Grid size={6}>
            <Typography>Name</Typography>
        </Grid>
    </Grid>
    )
}
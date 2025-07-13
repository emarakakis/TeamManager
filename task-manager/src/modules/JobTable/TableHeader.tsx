import { Grid, Typography } from "@mui/material"

export default function TableHeader(){
    return (
        <Grid container spacing={2} sx={{background:"white"}}>
            <Grid size={3.5}>
                    <Typography>Name</Typography>
                </Grid>
            <Grid size={3.5}>
                <Typography>Profession</Typography>
            </Grid>
            <Grid size={5}container sx={{justifyContent:"end", pr:3}}>
                <Typography>Options</Typography>
            </Grid>
        </Grid>
    )
}
import { Typography } from "@mui/material";
import {Grid} from '@mui/material'
import ItemModal from "../ItemModal/ItemModal";


export default function JobItem({
    name,
    profession,
    index,
    id
}: {
    name: string,
    profession:  "intern" | "junior" | "intermediate" | "senior",
    index: number,
    id: number
}){
    const color = index % 2 === 1 ? "white" : "#1976d2"
    return (
        <Grid container sx={{backgroundColor:color}}>
            <Grid container size={3.5}>
                <Typography>{name}</Typography>
            </Grid>
            <Grid container size={3.5}>
                <Typography>{profession}</Typography>
            </Grid>
            <Grid size={5}container sx={{justifyContent:"end", pr:3.5}}>
                <ItemModal id={id} type="job"/>
            </Grid>
        </Grid>)
    


}
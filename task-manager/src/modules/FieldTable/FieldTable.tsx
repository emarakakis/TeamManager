import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import getFields from '../../serverFunctions/getFields'
import { FieldData } from "@/types/FieldData"
import FieldItem from "../FieldItem/FieldItem"
import TableHeader from "./TableHeader"

export default function FieldTable({...props}){

    const {data} = useQuery<FieldData[]>({
        queryKey: ["fields"],
        queryFn: getFields
    })

    return (
        <Grid {...props}>
            <Typography variant="h2" sx={{justifyContent:"center"}}>Fields</Typography>
            <hr/>
            <TableHeader/>
            <hr/>
            {data?.map((f, i) => {
                return <FieldItem key={i} data={f} index={i}/>
            })}
        </Grid>
    )
}
import { Box, Grid } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import getFields from '../../serverFunctions/getFields'
import { FieldData } from "@/types/FieldData"

export default function FieldTable({...props}){

    const {data} = useQuery<FieldData[]>({
        queryKey: ["fields"],
        queryFn: getFields
    })

    console.log(data)

    return (
        <Grid {...props}>
            {data?.map((f, i) => {
                return <Box key={i}>
                    <span>{f.name}</span> <span>{f.area}</span>
                </Box>
            })}
        </Grid>
    )
}
import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import getFields from '../../serverFunctions/getFields'
import { FieldDataReturn } from "@/types/FieldData"
import FieldItem from "../FieldItem/FieldItem"
import TableHeader from "./TableHeader"
import Search from "../Search/Search"
import { useQueryState } from "@/app/hooks/query-state-hook"

export default function FieldTable({...props}){
    const [searchField, setSearchEmployee] = useQueryState('field')
    const {data} = useQuery<FieldDataReturn[]>({
        queryKey: ["fields", searchField],
        queryFn: () => getFields(searchField ?? "")
    })

    return (
        <Grid {...props}>
            <Typography variant="h2" sx={{justifyContent:"center"}}>Fields</Typography>
            <Search type="field" options = {[{key: 'name', value: 'Name'}, {key:'area', value:'Area'}]}/>
            <hr/>
            <TableHeader/>
            <hr/>
            {data?.map((f, i) => {
                return <FieldItem key={i} data={f} index={i}/>
            })}
        </Grid>
    )
}
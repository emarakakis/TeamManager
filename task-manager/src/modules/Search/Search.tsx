
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Box, Grid, Button, List, ListItem, Typography } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import SelectControl from "../SelectControl/SelectControl";
import { useQueryState } from "@/app/hooks/query-state-hook";
import qs from 'qs'
import { Option } from "../SelectControl/SelectControl";
import { useRef } from "react";

export default function Search({
    type,
    options
}:{type:string, options: Option[]}){
    const [searchType, setSearchType] = useQueryState(type)
    const [intenalValue, setInternalValue] = useState<string>("")
    const [activeSearch, setActiveSearch] = useState<Array<Object>>([])

    const {getValues, control} = useForm<{category: string}>()

    function handleSearch(){
        const typeObject = {...searchType}
        const field = getValues('category') ?? 'name'

        const val = intenalValue ? intenalValue : null
        typeObject[field] = val
        
        setInternalValue("")
        setSearchType(qs.stringify(typeObject))
    }

    function handleDeleteCondition(key: string){
        const typeObject = {...searchType}
        typeObject[key] = null
        setSearchType(qs.stringify(typeObject))

    }

    const conditions = Object.entries(searchType)

    return (
        <Box>
            <Grid container spacing={2} sx={{width:1}}>
                <Grid size = {3}>
                    <SelectControl
                        name="category"
                        defaultValue="name"
                        control={control}
                        options={options}
                    />
                </Grid>
                <Grid>
                    <SearchInput value={intenalValue} setValue={setInternalValue}/>
                </Grid>
                <Grid>
                    <Button onClick={handleSearch}>Press</Button>
                </Grid>
                <Grid>
                    <List>
                    {conditions.map(([key, value], index) => 
                        <ListItem key={key}>
                            <Typography>{key} = {value}</Typography>
                            <Button onClick={()=>handleDeleteCondition(key)}>Delete</Button>
                        </ListItem>
                        )}
                    </List>
                </Grid>
            </Grid>

        </Box>
    )
}
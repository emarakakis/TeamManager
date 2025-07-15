
import { useForm } from "react-hook-form";
import { Box, Grid, Button } from "@mui/material";
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
    const input = useRef("")
    const {getValues, control} = useForm<{category: string}>()

    function handleSearch(){
        const value = input.current
        const typeObject = {...searchType}
        const field = getValues('category') ?? 'name'
        console.log(`Employee : ${typeObject}`)

        if (value === null){
            typeObject[field] = undefined
        } else {
            typeObject[field] = value
        }
        setSearchType(qs.stringify(typeObject))
    }

    console.log(searchType)

    return (
        <Box>
            <Grid container spacing={2} sx={{width:1}}>
                <Grid size = {3}>
                    <SelectControl
                        name="category"
                        control={control}
                        options={options}
                    />
                </Grid>
                <Grid>
                    <SearchInput ref={input} value={"d"}/>
                </Grid>
                <Grid>
                    <Button onClick={handleSearch}>Press</Button>
                </Grid>
            </Grid>

        </Box>
    )
}
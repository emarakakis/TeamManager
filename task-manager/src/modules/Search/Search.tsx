import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import SelectControl from "../SelectControl/SelectControl";
import { useQueryState } from "@/app/hooks/query-state-hook";
import qs from 'qs'
import { Option } from "../SelectControl/SelectControl";

export default function Search({
    type,
    options
}:{type:string, options: Option[]}){
    const [searchType, setSearchType] = useQueryState(type)
    const methods = useForm<{category: string}>()

    function handleSearch(str : string | null){
        const typeObject = {...qs.parse(searchType ?? "")}
        const field = methods.getValues('category') ?? 'name'

        if (str === null){
            typeObject[field] = undefined
        } else {
            typeObject[field] = str
        }
        setSearchType(qs.stringify(typeObject))
    }

    return (
        <Box>
            <Grid container spacing={5}>
                <Grid size = {3}>
                    <SelectControl
                        name="category"
                        control={methods.control}
                        options={options}
                    />
                </Grid>
                <Grid>
                    <SearchInput handleSearch={handleSearch} />
                </Grid>
            </Grid>

        </Box>
    )
}
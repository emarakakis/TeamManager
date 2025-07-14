import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import SearchInput from "../SearchInput/SearchInput";
import SelectControl from "../SelectControl/SelectControl";
import { useQueryState } from "@/app/hooks/query-state-hook";

export default function Search({type}:{type:string}){

    const methods = useForm<{category: string}>()
    const {handleSubmit} = methods

    function onSubmit(data: {category: string}){
        console.log(data)
    }

    return (
        <Box>
            <Grid container spacing={5}>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid size = {3}>
                        <SelectControl
                            name="category"
                            control={methods.control}
                            options={[
                                {key:"name", value:"Name"},
                                {key:"surname", value:"Surname"},
                                {key:"phoneNumber", value:"Phone Number"},
                                {key:"Sex", value:"Sex"},
                                {key:"email", value:"Email"},
                            ]}
                        />
                    </Grid>
                    <Grid>
                        <SearchInput type={type} />
                    </Grid>
                    </form>
                </FormProvider>
            </Grid>

        </Box>
    )
}
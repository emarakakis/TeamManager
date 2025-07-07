"use client";

import {Box, Typography} from '@mui/material'
import {useForm, FormProvider} from 'react-hook-form'
import { Employee } from '@/types/employee'
import CreateInfo from '@/modules/Employee/CreateInfo'

export default function Page(){

    const methods = useForm<Employee>()

    function handleSubmit(data: string){
        console.log(data)
    }

    return(
        <FormProvider {...methods}>
            <form onSubmit={}>
                <CreateInfo/>
            </form>
        </FormProvider>
    )
}
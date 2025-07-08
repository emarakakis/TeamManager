"use client";

import {Box, Button, Typography} from '@mui/material'
import {useForm, FormProvider} from 'react-hook-form'
import { Employee, employeeDefault } from '@/types/employee'
import EmployeeInfo from '@/modules/Employee/EmployeeInfo'
import { FieldValues } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import postEmployee from '@/serverFunctions/postEmployee';

export default function Page(){
    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationKey : ["add-employee"],
        mutationFn  : postEmployee,
        onSuccess: async () => {
            console.log("Insertion worked!")
            await queryClient.invalidateQueries({queryKey:["employees"]})
        }
    })

    const methods = useForm<Employee>({defaultValues: employeeDefault})
    const {handleSubmit} = methods

    function onSubmit(data: Employee){
        data.sex = "male"
        mutate(data)
    }

    return(
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <EmployeeInfo/>
                <Button type="submit">Submit</Button>
            </form>
        </FormProvider>
    )
}
"use client";

import {Container, Button, Typography} from '@mui/material'
import {useForm, FormProvider} from 'react-hook-form'
import { Employee, employeeDefault } from '@/types/employee'
import EmployeeInfo from '@/modules/EmployeeForm/EmployeeForm'
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
        mutate(data)
    }

    return(
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container sx={{justifyContent:"center"}}>
                    <EmployeeInfo/>
                </Container>
            </form>
        </FormProvider>
    )
}
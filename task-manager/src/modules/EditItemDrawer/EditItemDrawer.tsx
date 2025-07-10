import { useQueryState } from "@/app/hooks/query-state-hook";
import { EmployeeReturn } from "@/types/employee";
import { Drawer, TextField, Box, Grid, Typography, Button } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import getEmployee from "@/serverFunctions/getEmployee";
import putEmployee from "@/serverFunctions/putEmployee";
import { useEffect } from "react";
import SelectControl from "../EmployeeForm/SelectControl";
import { slotProps } from "./styling";


export default function EditItemDrawer(){
    const {register, control, handleSubmit, reset} = useForm<EmployeeReturn>()
    const [editUser, setEditUser] = useQueryState('editUser')
    const queryClient = useQueryClient()

    const open = !!editUser

    const {data, isLoading} = useQuery<EmployeeReturn>({
        queryKey: ['employee', editUser],
        queryFn: () => getEmployee(editUser ?? ""),
        enabled: !!editUser
    })

    const {mutate} = useMutation({
        mutationKey: ['employee', 'update'],
        mutationFn: putEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']})
            handleClose()
        }
    })

    useEffect(() => {
        if (data !== undefined)
            reset(data)
    }, [data])



    function onSubmit(data: EmployeeReturn){
        mutate(data)
    }

    function handleClose(){
        setEditUser(null)
    }

    return (
        <Drawer anchor="right" onClose={handleClose} open={open} slotProps={slotProps}>
            {isLoading && <Box>Loading...</Box>}
            {!isLoading &&
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid sx={{display:"flex", flexDirection:"column", justifyContent:"center"}}>
                    <input type="hidden" {...register('id')}/>
                    <Grid container sx={{justifyContent:'center'}}>
                        <Typography variant="h2">Edit Employee</Typography>
                    </Grid>
                    <Grid container spacing={2} sx={{mt:2}}>
                        <TextField label="Name"{...register('name')}/>
                        <TextField label="Surname"{...register('surname')}/>
                    </Grid>
                    <Grid container spacing={2} sx={{mt:2}}>
                        <TextField label="Phone Number" {...register('phoneNumber')}/>
                        <SelectControl<EmployeeReturn>
                            control={control}
                            options={[
                                {key:"male", value:"Male"},
                                {key: "female", value:"Female"},
                                {key:"undefined", value:"Undefined"}]}
                            name="sex"/>
                    </Grid>
                    <Grid container spacing={5} sx={{mt:2, justifyContent:"center"}}>
                        <TextField label="Email" {...register('email')}/>
                    </Grid>
                    <Grid container spacing={5} sx={{mt:2, justifyContent:"center"}}>
                        <Button type="submit">Submit</Button>
                        <Button sx={{color:'red'}} onClick={handleClose}>Cancel</Button>
                    </Grid>
                </Grid>
            </form>}
        </Drawer>
    )

}
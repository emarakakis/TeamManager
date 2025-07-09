import { useQueryState } from "@/app/hooks/query-state-hook";
import { Employee, EmployeeReturn } from "@/types/employee";
import { Drawer, TextField, Box, Grid, Typography, Button } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import getEmployee from "@/serverFunctions/getEmployee";
import { useEffect } from "react";


export default function EditItemDrawer(){
    const {register, handleSubmit, reset} = useForm<EmployeeReturn>()
    const [editUser, setEditUser] = useQueryState('editUser')

    const open = !!editUser

        const {data, isLoading} = useQuery<EmployeeReturn>({
        queryKey: ['employee', editUser],
        queryFn: () => getEmployee(editUser ?? ""),
        enabled: !!editUser
    })

    useEffect(() => {
        if (data !== undefined)
            reset(data)
    }, [data])



    function onSubmit(data: EmployeeReturn){
        console.log(data)
        // mutate etc
    }

    function handleClose(){
        setEditUser(null)
    }

    return (
        <Drawer anchor="right" onClose={handleClose} open={open} slotProps={{
            paper: {
            sx: {
                height: "30%",
                padding: 2,
                borderRadius: '16px 0 0 16px', 
                overflow: 'visible',           
                mt: 4,                       
                top:'25%'
            }}}}>
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
                        <TextField label="Sex" {...register('sex')}/>
                    </Grid>
                    <Grid container spacing={5} sx={{mt:2, justifyContent:"center"}}>
                        <TextField label="Email" {...register('email')}/>
                    </Grid>
                    <Grid container spacing={5} sx={{mt:2, justifyContent:"center"}}>
                        <Button>Submit</Button>
                    </Grid>
                </Grid>
            </form>}
        </Drawer>
    )

}
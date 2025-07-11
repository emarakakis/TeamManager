import { useQueryBatch} from "@/app/hooks/query-state-hook";
import { EmployeeReturn } from "@/types/employee";
import { Drawer, Box, Grid, Button} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import getEmployee from "@/serverFunctions/getEmployee";
import getField from "@/serverFunctions/getField";
import putEmployee from "@/serverFunctions/putEmployee";
import { useEffect } from "react";

import { slotProps } from "./styling";
import { FieldDataReturn } from "@/types/FieldData";
import EditEmployee from "./EditEmployee";
import EditField from "./EditField";
import putField from "@/serverFunctions/putField";


export default function EditItemDrawer(){
    const methods = useForm<EmployeeReturn | Exclude<FieldDataReturn,"success">>()
    const queryClient = useQueryClient()
    const [editDataBatch, setEditDataBatch] = useQueryBatch(['editItem', 'dataType'])
    const {editItem, dataType} = editDataBatch


    const open = !!editItem && !!dataType

    const {data, isLoading} = useQuery<EmployeeReturn | Exclude<FieldDataReturn,"success">>({
        queryKey: ['employee', dataType, editItem],
        queryFn: () => {
            if(dataType==="employee")
                return getEmployee(editItem ?? "")
            else if (dataType==="field")
                console.log("Piou")
                return getField(editItem ?? "")
        },
        enabled: !!editItem
    })

    console.log(data)
 
    useEffect(() => {
        if (data !== undefined)
            methods.reset(data)
    }, [data])

    const {mutate: mutateEmployee} = useMutation({
        mutationKey: ['employee', 'update'],
        mutationFn: putEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['employees']})
            handleClose()
            setEditDataBatch([{key:"editItem", value:null}, {key:"dataType", value:null}])
        }
    })

    const {mutate: mutateField} = useMutation({
        mutationKey: ['fields', 'update'],
        mutationFn: putField,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['fields']})
            handleClose()
            setEditDataBatch([{key:"editItem", value:null}, {key:"dataType", value:null}])
        }
    })

    function onSubmit(data: EmployeeReturn | FieldDataReturn){
        if (dataType === "employee")
            mutateEmployee(data as EmployeeReturn)
        else
            mutateField(data as FieldDataReturn)
    }

    function handleClose(){
        setEditDataBatch([{key:"editItem", value:null}, {key:"dataType", value:null}])
    }

    return (
        <Drawer anchor="right" onClose={handleClose} open={open} slotProps={slotProps}>
            {isLoading && <Box>Loading...</Box>}
            {!isLoading &&
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {dataType === "employee" && data &&
                    <EditEmployee/>
                }

                {dataType === "field" && data &&
                    <EditField data={data as FieldDataReturn}/>
                }

                <Grid container spacing={5} sx={{mt:2, justifyContent:"center"}}>
                    <Button type="submit">Submit</Button>
                    <Button sx={{color:'red'}} onClick={handleClose}>Cancel</Button>
                </Grid>
                
            </form>
            </FormProvider>}
        </Drawer>
    )

}
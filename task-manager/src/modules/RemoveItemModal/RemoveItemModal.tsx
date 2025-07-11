import { Dialog, DialogTitle, Button, DialogContent, DialogContentText, Grid, Box, Typography } from "@mui/material";
import { useQueryBatch } from "@/app/hooks/query-state-hook";
import { useMutation } from '@tanstack/react-query';
import deleteEmployee from '@/serverFunctions/deleteEmployee';
import deleteField from "@/serverFunctions/deleteField";
import { useQueryClient } from '@tanstack/react-query';

const paperProps = {
    paper:{
        sx:{
            width: 350,
            height: 150, 
            padding: 3,
            borderRadius: 3,
            overflow: 'hidden'
        }
    }
}

export default function RemoveItemModal(){

    const [editDataBatch, setEditDataBatch] = useQueryBatch(['deleteItem', 'dataType'])
    const {deleteItem, dataType} = editDataBatch
    const queryClient = useQueryClient()

    const open = !!deleteItem && !!dataType

    const {mutate: mutateEmployee} = useMutation({
        mutationKey: ["delete", "employee"],
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['employees']})
            setEditDataBatch([{key:"deleteItem", value:null}, {key:"dataType", value:null}])
            handleClose()
        },
    })

    const {mutate: mutateField} = useMutation({
        mutationKey: ["delete", "field"],
        mutationFn: deleteField,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['fields']})
            setEditDataBatch([{key:"deleteItem", value:null}, {key:"dataType", value:null}])
            handleClose()
        },
    })

    function handleClose(){
        setEditDataBatch([{key:"deleteItem", value:null}, {key:"dataType", value:null}])
    }

    function handleClick(){
        if (dataType === "employee")
            mutateEmployee(Number(deleteItem))
        else
            mutateField(Number(deleteItem))
    }

    let content = dataType === "employee" ? "Employee" : "Field"

    return (
        <Box sx={{width:"100px"}}>
        <Dialog aria-modal={true} scroll="paper" open={open} sx={{width:1}} slotProps={paperProps} onClose={handleClose}>
            <Grid>
                <Grid container sx={{justifyContent:"center"}}>
                    <DialogTitle>Delete Item</DialogTitle>
                </Grid>
                <Grid container sx={{justifyContent:"center"}}>
                    <DialogContentText>Are you sure you want to delete the {!!content && content}?</DialogContentText>
                </Grid>
                <Grid container sx={{justifyContent:"center"}}>
                    <DialogContent sx={{display: "flex", justifyContent:"center"}}>
                        <Button sx={{color:'green'}} onClick={handleClick}>Yes</Button>
                        <Button sx={{color:'red'}} onClick={()=> handleClose()}>No</Button>
                    </DialogContent>
                </Grid>
            </Grid>
        </Dialog>
        </Box>
    )
}
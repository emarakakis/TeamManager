
import { IconButton ,Button, MenuList, MenuItem, ListItemIcon, ListItemText, Menu} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, MouseEvent } from 'react';
import { useQueryState } from '@/app/hooks/query-state-hook';
export default function ItemModal({id} : {id: number}){
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
    const [editUser, setEditUser] = useQueryState('editUser')
    const open = !!anchorEl
    function handleClick(event: MouseEvent<HTMLElement>){
        setAnchorEl(event?.currentTarget)
    }

    function handleClose(){
        setAnchorEl(null)
    }

    function handleEdit(){
        setEditUser(id.toString())
        setAnchorEl(null)
    }

    function handleDelete(){
        
    }

    return (
        <>
        <IconButton 
            sx={{justifyContent:"center"}} 
            onClick={handleClick}
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}>
            <MoreVertIcon/>
        </IconButton>


        <Menu 
            open={open}
            id="basic-menu"
            anchorEl={anchorEl}
            onClose={handleClose}>
            <MenuList>
                <MenuItem onClick={handleEdit}>
                    <ListItemIcon >
                        <InfoIcon />
                    </ListItemIcon>
                    <ListItemText>
                        Edit
                    </ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete}>
                    <ListItemIcon >
                        <DeleteIcon sx={{color:'red'}}/>
                    </ListItemIcon>
                    <ListItemText>
                        Delete
                    </ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
      </>
    )

}
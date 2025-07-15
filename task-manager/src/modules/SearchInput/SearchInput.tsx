import { useRef,ChangeEvent, useState, Dispatch, SetStateAction } from "react"
import { TextField } from "@mui/material"
import { useQueryState } from "@/app/hooks/query-state-hook"
import { useFormContext } from "react-hook-form"
import qs from 'qs'
export default function SearchInput({
    setValue,
    value,
    ...props
} : {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}){
    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const value = event.target.value;
        setValue(value)
        }

    return <TextField type="text" value={value} {...props} onChange={handleChange}/>
}
import { useRef,ChangeEvent, useState, RefObject } from "react"
import { TextField } from "@mui/material"
import { useQueryState } from "@/app/hooks/query-state-hook"
import { useFormContext } from "react-hook-form"
import qs from 'qs'
export default function SearchInput({
    ref,
    ...props
} : {ref : RefObject<string>}){
    const [intenalValue, setInternalValue] = useState<string>("")
    
    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const value = event.target.value;
        ref.current = value
        setInternalValue(value)
        }

    return <TextField type="text" value={intenalValue} {...props} onChange={handleChange}/>
}
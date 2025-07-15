import { useRef,ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"
import { useQueryState } from "@/app/hooks/query-state-hook"
import { useFormContext } from "react-hook-form"
import qs from 'qs'
export default function SearchInput({
    handleSearch,
    ...props
} : {handleSearch : (str: string | null) => void}){
    const timeoutTime = useRef<number | null>(null)
    const [intenalValue, setInternalValue] = useState<string>
    ("")
    
    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const value = event.target.value;

        if (timeoutTime.current)
            clearTimeout(timeoutTime.current)
        setInternalValue(value)
        timeoutTime.current = window.setTimeout(() => {
            if (value){
                return handleSearch(value)
            } else {
                return handleSearch(null)
            }
        }, 500)
    }

    return <TextField type="text" value={intenalValue} {...props} onChange={handleChange}/>
}
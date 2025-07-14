import { useRef,ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"
import { useQueryState } from "@/app/hooks/query-state-hook"
export default function SearchInput({
    type, 
    ...props
} : {
    type: string
}){
    const timeoutTime = useRef<number | null>(null)

    const [searchType, setSearchType] = useQueryState(type)
    const [intenalValue, setInternalValue] = useState<string>(searchType ?? "")
    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const value = event.target.value;

        if (timeoutTime.current)
            clearTimeout(timeoutTime.current)
            setInternalValue(value)
            timeoutTime.current = window.setTimeout(() => {
            if (value){
                return setSearchType(value)
            } else {
                return setSearchType(null)
            }
        }, 500)
    }

    return <TextField type="text" value={intenalValue} {...props} onChange={handleChange}/>
}
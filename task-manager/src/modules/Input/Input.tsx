import { useRef,ChangeEvent, useState } from "react"
import { TextField } from "@mui/material"
import { useQueryState } from "@/app/hooks/query-state-hook"
export default function Input(){
    const timeoutTime = useRef<number | null>(null)
    const [searchEmployee, setSearchEmployee] = useQueryState('employee')
    const [inputValue, setInputValue] = useState<string>(searchEmployee ?? "")
    function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const value = event.target.value;
        setInputValue(inputValue)
        if (timeoutTime.current)
            clearTimeout(timeoutTime.current)

        timeoutTime.current = window.setTimeout(() => {
            if (value){
                return setSearchEmployee(value)
            } else {
                return setSearchEmployee(null)
            }
        }, 500)
    }

    return <TextField type="text" value={inputValue} onChange={handleChange}/>
}
import { Controller, Control } from "react-hook-form";
import { Select } from "@mui/material";


type Option = {
    key: string
    value: string
}

type SelectProps = {
    label: string
    name: string
    errors: any
    options: Option[]
    control: Control<{[key:string] : 'true' | 'false' | string}>
}

export const MySelect = (
    {label,
    name,
    errors,
    control,
    options
    ...props}
    : SelectProps
) => {
    return (
        <Controller 
            name={name}
            control={control}
            render={({ field }) => {
                return <Select 
                    options = {
                        options.map(option)
                    }
                />
            }}/>
    )

}
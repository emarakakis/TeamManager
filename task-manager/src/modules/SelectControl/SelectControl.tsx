import { forwardRef, useState, ChangeEvent } from "react"
import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { Select, SelectChangeEvent, MenuItem } from "@mui/material"

export type Option = {
    key: string
    value: string
}

type SelectProps<T extends FieldValues> = {
    name: Path<T>
    options: Option[]
    control: Control<T>
    onChange?: (event: SelectChangeEvent) => void
}

type SelectPureProps = {
    options: Option[]
    onChange: (event: SelectChangeEvent) => void
    value : string
}



const SelectPure = forwardRef<HTMLDivElement, SelectPureProps>(({options, onChange, value, ...props}, ref) => {
    const [selected, setSelected] = useState<string>("undefined")

    function handleChange(event: SelectChangeEvent){
        if ("nativeEvent" in event) {
            const value = event.target.value;
            console.log("mple")
            setSelected(value as string);
            onChange(event);
        } else {
            const option = event.target
            setSelected(option.value as string)
            onChange(event)
        }
}
  

    return <Select
        {...props}
        onChange={(event) => handleChange(event)}
        ref = {ref}
        value = {value ?? ""}
    >
        {options.map((s, i) => {
            return <MenuItem selected={selected === s.key} value={s.key} key={i}>{s.value}</MenuItem>
        })}
    </Select>

})


export default function SelectControl<T extends FieldValues>({
    name,
    options,
    control,
    ...props
}: SelectProps<T>
){
    return (
        <Controller 
            name = {name}
            control={control}
            render={({field}) => {
                return (<SelectPure
                    {...field}
                    {...props}
                    options={options}
                    onChange={field.onChange}
                    value={field.value}
                />)

            }}
        />
    )

}
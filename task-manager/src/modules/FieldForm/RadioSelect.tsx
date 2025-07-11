import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { forwardRef, useState, ChangeEvent } from "react"

type RadioOption = {
  key: string;
  value: string;
  label: string;
};

type RadioProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  radios: RadioOption[];
  row : boolean;
  defaultValue: string | undefined

};

type RadioPureProps = {
    name : string
    onChange : (event: ChangeEvent<HTMLInputElement>, value: string) => void
    value : string
    radios: RadioOption[]
    defaultValue: string | undefined
    row   : boolean
}

const RadioPure = forwardRef<HTMLDivElement, RadioPureProps>((
    {radios, onChange, row, value, defaultValue,  ...props}, ref) => {
        const [selected, setSelected] = useState<string | undefined>(defaultValue)

        function handleChange(event: ChangeEvent<HTMLInputElement>){
            const value = event.target.value
            setSelected(value)
            onChange(event, value)
        }

        return (
            <FormControl>
              <FormLabel sx={{display:"flex", justifyContent:'center', fontSize:20}}>Select Field's Area</FormLabel>
              <RadioGroup row = {row} {...props} value={selected} onChange={handleChange} >
                  {radios.map((r, i) => {
                      return <FormControlLabel key = {i} label={r.label} value={r.value} control={<Radio/>}/>
                  })}
              </RadioGroup>
            </FormControl>
        )
})

export default function RadioSelect<T extends FieldValues>({
  name,
  control,
  radios,
  defaultValue,
  row
}: RadioProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
          <RadioPure
            {...field}
            row = {row}
            onChange={field.onChange}           
            radios={radios}
            defaultValue={defaultValue}
          />
      )}
    />
  );
}

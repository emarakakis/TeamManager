import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import { forwardRef, useState, ChangeEvent } from "react"

type RadioOption = {
  key: string;
  value: string;
  label: string;
};

type RadioProps = {
  name: string;
  control: Control<any>;
  defaultValue?: string;
  radios: RadioOption[];
  row : boolean
};

type RadioPureProps = {
    name : string
    onChange : (event: ChangeEvent<HTMLInputElement>, value: string) => void
    value : string
    radios: RadioOption[]
    defaultValue?: string
    row   : boolean
}

const RadioPure = forwardRef<HTMLDivElement, RadioPureProps>((
    {radios, onChange, row, ...props}, ref) => {
        const [selected, setSelected] = useState<string>("")

        function handleChange(event: ChangeEvent<HTMLInputElement>){
            const value = event.target.value
            setSelected(value)
            onChange(event, value)
        }

        return (
            <FormControl>
              <FormLabel sx={{display:"flex", justifyContent:'center', fontSize:20}}>Select Field's Area</FormLabel>
              <RadioGroup row = {row} {...props} onChange={handleChange} >
                  {radios.map((r, i) => {
                      console.log(r)
                      return <FormControlLabel key = {i} label={r.label} value={r.value} control={<Radio/>}/>
                  })}
              </RadioGroup>
            </FormControl>
        )
})

export default function RadioSelect({
  name,
  control,
  defaultValue = "",
  radios,
  row
}: RadioProps) {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
          <RadioPure
            {...field}
            row = {row}
            onChange={field.onChange}            
            radios={radios}
          />
      )}
    />
  );
}

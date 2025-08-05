import { useRef, ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import { TextField, TextFieldProps } from "@mui/material";

type SearchInputProps = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
} & TextFieldProps;
export default function SearchInput({
  setValue,
  value,
  ...props
}: SearchInputProps) {
  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const value = event.target.value;
    setValue(value);
  }

  return (
    <TextField type="text" value={value} {...props} onChange={handleChange} />
  );
}

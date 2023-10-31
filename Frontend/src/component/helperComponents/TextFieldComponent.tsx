import React from "react";
import TextField from "@mui/material/TextField";

type CustomTextFieldProps = {
  id?: string;
  value: string | number;
  label: string;
  type?: string;
  isReadonly?: boolean;
  error: boolean;
  helperText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CustomTextField = ({
  id,
  value,
  label,
  error,
  helperText,
  onChange,
  type = "text",
  isReadonly = false,
}: CustomTextFieldProps) => {
  return (
    <TextField
      autoFocus
      margin="dense"
      fullWidth
      variant="standard"
      id={id}
      label={label}
      type={type}
      value={value}
      aria-readonly={isReadonly}
      error={error}
      helperText={helperText}
      onChange={onChange}
    />
  );
};

export default CustomTextField;

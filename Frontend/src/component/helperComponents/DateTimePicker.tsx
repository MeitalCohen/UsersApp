import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "./helperComponents.css";
import { useState } from "react";

type DateTimePickerParams = {
  currentBirthday: Dayjs;
  onChange: (newValue: Dayjs) => void;
  error?: string;
};

const DateTimePickerValue = ({
  currentBirthday,
  onChange,
  error,
}: DateTimePickerParams) => {
  const [value, setValue] = useState<Dayjs | null>(dayjs(currentBirthday));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
        <DateTimePicker
          label="Birthday"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
            if (newValue) {
              onChange(newValue);
            }
          }}
        />
      </DemoContainer>
      {error && <span className="errorsTextField">{error}</span>}
    </LocalizationProvider>
  );
};

export default DateTimePickerValue;

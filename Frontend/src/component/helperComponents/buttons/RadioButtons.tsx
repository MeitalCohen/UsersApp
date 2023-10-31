import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Gender, UsersTitles } from "../../../types/types";

type RadioParamsType = {
  currentGender: Gender;
  handleChangeGender: (gender: Gender) => void;
};

const RadioButtonsGroup = ({
  currentGender,
  handleChangeGender,
}: RadioParamsType) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleChangeGender(e.target.value as Gender);
  };

  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        {UsersTitles.Gender}
      </FormLabel>
      <RadioGroup
        onChange={(e) => handleChange(e)}
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel
          value={Gender.Female}
          checked={currentGender.trim() === Gender.Female}
          control={<Radio />}
          label={Gender.Female}
        />
        <FormControlLabel
          value={Gender.Male}
          checked={currentGender.trim() === Gender.Male}
          control={<Radio />}
          label={Gender.Male}
        />
        <FormControlLabel
          value={Gender.Other}
          checked={currentGender.trim() === Gender.Other}
          control={<Radio />}
          label={Gender.Other}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioButtonsGroup;

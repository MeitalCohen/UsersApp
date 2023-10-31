import IconButton from "@mui/material/IconButton";
import CreateIcon from "@mui/icons-material/Create";
import { ActionName } from "../../../types/types";

type ParamsType = {
  onClick: () => void;
};

const UpdateButton = ({ onClick }: ParamsType) => {
  return (
    <IconButton aria-label={ActionName.Update} color="info" onClick={onClick}>
      <CreateIcon />
    </IconButton>
  );
};

export default UpdateButton;

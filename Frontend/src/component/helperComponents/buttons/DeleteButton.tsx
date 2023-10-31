import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActionName } from "../../../types/types";

type ParamsType = {
  onClick: () => void;
};

const DeleteButton = ({ onClick }: ParamsType) => {
  return (
    <IconButton aria-label={ActionName.Delete} onClick={onClick}>
      <DeleteIcon color="error" />
    </IconButton>
  );
};

export default DeleteButton;

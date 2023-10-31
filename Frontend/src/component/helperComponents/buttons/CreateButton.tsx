import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { ActionName } from "../../../types/types";

type ParamsType = {
  onClick: () => void;
};

const CreateButton = ({ onClick }: ParamsType) => {
  return (
    <IconButton
      aria-label={ActionName.Create}
      color="info"
      size="large"
      onClick={onClick}
    >
      <AccountCircleIcon />
    </IconButton>
  );
};

export default CreateButton;

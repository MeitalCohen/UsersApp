import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { ActionName } from "../../../types/types";

type ParamsType = {
  onClick: () => void;
};

const RefreshButton = ({ onClick }: ParamsType) => {
  return (
    <IconButton
      aria-label={ActionName.Refresh}
      color="secondary"
      onClick={onClick}
      size="large"
    >
      <RefreshIcon />
    </IconButton>
  );
};

export default RefreshButton;

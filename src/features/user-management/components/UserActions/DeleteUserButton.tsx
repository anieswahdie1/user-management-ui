import { Delete } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

import { DeleteUserButtonProps } from "../../types/user.types";

export const DeleteUserButton = ({
  userId,
  onDelete,
  isDeleting,
}: DeleteUserButtonProps) => {
  return (
    <Tooltip title="Delete user">
      <IconButton
        onClick={() => onDelete(userId)}
        disabled={isDeleting}
        color="error"
        aria-label={`Delete user ${userId}`}
        size="small"
      >
        <Delete />
      </IconButton>
    </Tooltip>
  );
};

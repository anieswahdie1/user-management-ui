import { useState } from "react";

import { Delete } from "@mui/icons-material";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";

import { DeleteUserButtonProps } from "../../types/user.types";

export const DeleteUserButton = ({
  userId,
  onDelete,
  isDeleting,
}: DeleteUserButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setIsProcessing(true);
      try {
        await onDelete(userId);
      } catch (error) {
        console.error("Delete failed:", error);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const isLoading = isDeleting || isProcessing;

  return (
    <Tooltip title={isLoading ? "Deleting user..." : "Delete user"}>
      <span>
        <IconButton
          onClick={handleDelete}
          disabled={isLoading}
          color="error"
          aria-label={`Delete user ${userId}`}
          size="small"
        >
          {isLoading ? (
            <CircularProgress size={20} color="error" />
          ) : (
            <Delete />
          )}
        </IconButton>
      </span>
    </Tooltip>
  );
};

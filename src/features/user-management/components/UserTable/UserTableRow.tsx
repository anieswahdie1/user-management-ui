import { memo } from "react";

import { TableCell, TableRow } from "@mui/material";

import { User } from "../../types/user.types";
import { DeleteUserButton } from "../UserActions";

interface UserTableRowProps {
  user: User;
  onDelete: (userId: number) => void;
  isDeleting: boolean;
}

export const UserTableRow = memo(
  ({ user, onDelete, isDeleting }: UserTableRowProps) => {
    return (
      <TableRow
        hover
        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell component="th" scope="row">
          {user.id}
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.company.name}</TableCell>
        <TableCell>
          <DeleteUserButton
            userId={user.id}
            onDelete={onDelete}
            isDeleting={isDeleting}
          />
        </TableCell>
      </TableRow>
    );
  }
);

UserTableRow.displayName = "UserTableRow";

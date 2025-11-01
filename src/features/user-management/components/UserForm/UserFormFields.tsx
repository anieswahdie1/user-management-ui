import { useFormContext } from "react-hook-form";

import { TextField } from "@mui/material";

import { UserFormData } from "../../types/user.types";

export const UserFormFields = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UserFormData>();

  return (
    <>
      <TextField
        {...register("name")}
        label="Name"
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        margin="normal"
        autoComplete="name"
      />

      <TextField
        {...register("email")}
        label="Email"
        type="email"
        error={!!errors.email}
        helperText={errors.email?.message}
        fullWidth
        margin="normal"
        autoComplete="email"
      />
    </>
  );
};

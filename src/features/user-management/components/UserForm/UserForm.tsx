import { FormProvider } from "react-hook-form";

import { Add } from "@mui/icons-material";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";

import { useUserForm } from "../../hooks/useUserForm";
import { UserFormProps } from "../../types/user.types";
import { UserFormFields } from "./UserFormFields";

export const UserForm = ({ onSubmit, isSubmitting }: UserFormProps) => {
  const formMethods = useUserForm();

  const handleSubmit = (data: any) => {
    onSubmit(data);
    formMethods.reset();
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New User
      </Typography>

      <FormProvider {...formMethods}>
        <Box component="form" onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <UserFormFields />

          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={3}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => formMethods.reset()}
              disabled={isSubmitting}
            >
              Reset
            </Button>

            <Button
              type="submit"
              variant="contained"
              startIcon={<Add />}
              disabled={isSubmitting}
              sx={{ minWidth: 120 }}
            >
              {isSubmitting ? "Adding..." : "Add User"}
            </Button>
          </Stack>
        </Box>
      </FormProvider>
    </Paper>
  );
};

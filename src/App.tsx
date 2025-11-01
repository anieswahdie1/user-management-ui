import { useState } from "react";

import { Alert, Box, Container, Snackbar, Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {
  useCreateUser,
  useDeleteUser,
  UserForm,
  UserFormData,
  UserTable,
  useUsers,
} from "./features/user-management";
import { ErrorAlert } from "./shared/components/ErrorAlert";
import { LoadingSpinner } from "./shared/components/LoadingSpinnes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

function UserManagementApp() {
  const { data: users = [], isLoading, error, refetch } = useUsers();
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleAddUser = (userData: UserFormData) => {
    createUserMutation.mutate(userData, {
      onSuccess: () => {
        setSnackbar({
          open: true,
          message: "User added successfully!",
          severity: "success",
        });
      },
      onError: (error) => {
        setSnackbar({
          open: true,
          message: `Failed to add user: ${error.message}`,
          severity: "error",
        });
      },
    });
  };

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation.mutate(userId, {
      onSuccess: () => {
        console.log(`User ${userId} deleted successfully`);
      },
      onError: (error) => {
        setSnackbar({
          open: true,
          message: `Failed to delete user: ${error.message}`,
          severity: "error",
        });
      },
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading users..." />;
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ErrorAlert
          title="Failed to load users"
          message={error.message}
          onRetry={() => refetch()}
        />
      </Container>
    );
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box mb={4}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            fontWeight="bold"
          >
            User Management
          </Typography>
        </Box>

        <UserForm
          onSubmit={handleAddUser}
          isSubmitting={createUserMutation.isPending}
        />

        <UserTable
          users={users}
          onDeleteUser={handleDeleteUser}
          isDeleting={deleteUserMutation.isPending}
        />
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UserManagementApp />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

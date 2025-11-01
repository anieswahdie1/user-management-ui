import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
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
  const { data: users = [], isLoading, error } = useUsers();
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();

  const handleAddUser = (userData: UserFormData) => {
    createUserMutation.mutate(userData);
  };

  const handleDeleteUser = (userId: number) => {
    deleteUserMutation.mutate(userId);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          Error loading users: {error.message}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
          User Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your users efficiently
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

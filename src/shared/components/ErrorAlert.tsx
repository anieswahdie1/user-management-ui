import { Refresh } from "@mui/icons-material";
import { Alert, AlertTitle, Box, Button } from "@mui/material";

interface ErrorAlertProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert = ({
  title = "Error",
  message,
  onRetry,
}: ErrorAlertProps) => {
  return (
    <Box py={2}>
      <Alert
        severity="error"
        action={
          onRetry && (
            <Button
              color="inherit"
              size="small"
              onClick={onRetry}
              startIcon={<Refresh />}
            >
              Retry
            </Button>
          )
        }
      >
        <AlertTitle>{title}</AlertTitle>
        {message}
      </Alert>
    </Box>
  );
};

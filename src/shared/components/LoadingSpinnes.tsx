import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
}

export const LoadingSpinner = ({
  size = 40,
  message = "Loading...",
}: LoadingSpinnerProps) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={4}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary" mt={2}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

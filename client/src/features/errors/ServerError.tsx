import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Paper style={{ padding: 20 }}>
      {state?.error ? (
        <>
          <Typography variant="h3" color="secondary">
            {state.error.message || "there was an error"}
          </Typography>
          <Divider />
          <Typography variant="body1">
            {state.error?.details || "no details available"}
          </Typography>
        </>
      ) : (
        <Typography variant="body1">
          Something went wrong on the server.
        </Typography>
      )}
    </Paper>
  );
}

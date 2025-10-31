import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function homepage() {
  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        margin: "15px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(135deg, #182a73 0%, #218aae 96%, #20a7ac 89%)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 3,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to the Activity App
        </Typography>
        <Typography variant="h5">
          This is the homepage. Use the navigation bar to explore activities.
        </Typography>
      </Box>

      <Button
        component={Link}
        to="/activities"
        variant="contained"
        size="large"
        sx={{ height: 80, borderRadius: 4, fontSize: "1.5" }}
      >
        Go to Activities
      </Button>
    </Paper>
  );
}

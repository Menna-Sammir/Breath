import { Search } from "lucide-react";
import { Button, Paper, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Paper elevation={3} sx={{ padding: 4, textAlign: "center" }}>
      <Search className="text-primary mb-2" size={48} />
      <Typography variant="h4" gutterBottom>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist. It might have been moved or
        deleted.
      </Typography>
      <Button fullWidth href="/" variant="contained" sx={{ marginTop: 2 }}>
        Go to Home
      </Button>
    </Paper>
  );
}

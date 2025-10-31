import {
  Box,
  Paper,
  Typography,
  MenuItem,
  MenuList,
  ListItemText,
} from "@mui/material";
import { FilterList, Event } from "@mui/icons-material";
import "react-calendar/dist/Calendar.css";
import { Calendar } from "react-calendar";

export default function ActivityFilters() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: 3, borderRadius: 3 }}
    >
      <Paper sx={{ padding: 2 }}>
        <Box sx={{ width: "100%", textAlign: "center", mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            <FilterList sx={{ mr: 1 }} /> Filters
          </Typography>
          <MenuList>
            <MenuItem value="">
              <ListItemText primary="All events" />
            </MenuItem>
            <MenuItem value="">
              <ListItemText primary="I'm going" />
            </MenuItem>
            <MenuItem value="">
              <ListItemText primary="I'm hosting" />
            </MenuItem>
          </MenuList>
        </Box>
      </Paper>
      <Box component={Paper} sx={{ width: "100%", textAlign: "center", mb: 2 }}>
        <Typography
          variant="h6"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Event sx={{ mr: 1 }} /> Select Date
        </Typography>
        <Calendar />
      </Box>
    </Box>
  );
}

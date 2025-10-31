import { Outlet, useLocation } from "react-router";
import "./App.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Container } from "@mui/material";
import { Box } from "@mui/material";
import NavBar from "./NavBar";
import HomePage from "../../features/activities/home/homepage";

function App() {
  const location = useLocation();
  return (
    <Box sx={{ bgcolor: "#eeeeee", minHeight: "100vh" }}>
      <CssBaseline />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container maxWidth="xl" sx={{ mt: 3 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
}

export default App;

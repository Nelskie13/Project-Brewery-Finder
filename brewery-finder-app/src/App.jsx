import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  IconButton,
  Link,
} from "@mui/material";
import BreweriesList from "./Components/BreweriesList";
import BreweriesSearchBar from "./Components/BreweriesSearchBar";
import BreweriesDetails from "./Components/BreweriesDetails";
import { Home as HomeIcon } from "@mui/icons-material";

const BreweriesContainer = () => (
  <>
    <BreweriesSearchBar />
    <BreweriesList />
  </>
);

const Footer = () => (
  <Box
    component="footer"
    sx={{ mt: "auto", py: 2, backgroundColor: "#f5f5f5" }}
  >
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <Typography variant="body2" color="textSecondary">
        Brewery Finder &copy; {new Date().getFullYear()}
      </Typography>
    </Container>
  </Box>
);

function App() {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="home"
            component={Link}
            to="/"
            sx={{ mr: 2 }}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Brewery Finder
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ paddingTop: 20 }}>
        <Routes>
          <Route path="/" element={<BreweriesContainer />} />
          <Route path="/Breweries/:id" element={<BreweriesDetails />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;

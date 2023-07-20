import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  CssBaseline,
  Box,
  IconButton,
  Button,
} from "@mui/material";
import BreweriesList from "./Components/BreweriesList";
import BreweriesSearchBar from "./Components/BreweriesSearchBar";
import BreweriesDetails from "./Components/BreweriesDetails";
import WishlistPage from "./Components/WishlistPage";
import { Home as HomeIcon, Star as StarIcon } from "@mui/icons-material"; // New import

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
          <Button
            component={Link}
            to="/Wishlist"
            color="inherit"
            startIcon={<StarIcon />}
          >
            Wishlist
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ pt: 5, pb: 5 }}>
        <Routes>
          <Route path="/" element={<BreweriesContainer />} />
          <Route path="/Breweries/:id" element={<BreweriesDetails />} />
          <Route path="/Wishlist" element={<WishlistPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;

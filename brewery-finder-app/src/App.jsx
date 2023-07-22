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
  Badge,
  Tooltip,
} from "@mui/material";
import BreweriesList from "./Components/BreweriesList";
import BreweriesSearchBar from "./Components/BreweriesSearchBar";
import BreweriesDetails from "./Components/BreweriesDetails";
import WishlistPage from "./Components/WishlistPage";
import { Home as HomeIcon, Star as StarIcon } from "@mui/icons-material"; // New import
import { useSelector } from "react-redux";

const BreweriesContainer = () => (
  <>
    <BreweriesSearchBar />
    <BreweriesList />
  </>
);

const Footer = () => (
  <Box
    component="footer"
    sx={{ mt: "auto", py: 3, backgroundColor: "#f5f5f5" }}
  >
    <Container maxWidth="md" sx={{ textAlign: "center" }}>
      <Typography variant="body2" color="textSecondary">
        Brewery Finder by Jonel Capa &copy; {new Date().getFullYear()}
      </Typography>
    </Container>
  </Box>
);

function App() {
  const wishlistBreweries = useSelector((state) => state.wishlist.breweries);

  return (
    <Router>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <Tooltip title="Home">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="home"
              component={Link}
              to="/"
              sx={{ mr: 2 }}
            >
              <HomeIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Brewery Finder
          </Typography>
          <Tooltip title="See the Wishlist">
            <Button
              component={Link}
              to="/Wishlist"
              color="inherit"
              startIcon={
                <Badge
                  badgeContent={wishlistBreweries.length}
                  color="secondary"
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <StarIcon />
                </Badge>
              }
            >
              Wishlist
            </Button>
          </Tooltip>
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

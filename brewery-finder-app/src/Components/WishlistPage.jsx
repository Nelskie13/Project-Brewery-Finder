import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  Divider,
  IconButton,
  Button,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  StarBorder as StarOutlineIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { removeFromWishlist } from "../Redux-store/WishlistSlice"; // Update the path accordingly

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistBreweries = useSelector((state) => state.wishlist.breweries);
  const [showAlert, setShowAlert] = useState(null);

  const isBreweryInWishlist = (breweryId) =>
    wishlistBreweries.some((brewery) => brewery.id === breweryId);

  const handleToggleWishlist = (brewery) => {
    if (isBreweryInWishlist(brewery.id)) {
      dispatch(removeFromWishlist(brewery.id));
      setShowAlert("Removed from Wishlist!");
    }

    // Set a timeout to hide the alerts after 3 seconds
    setTimeout(() => {
      setShowAlert(null);
    }, 2000);
  };

  const AlertMessage = ({ severity, message, onClose }) => (
    <Alert
      severity={severity}
      variant="filled"
      onClose={onClose}
      sx={{
        position: "fixed",
        top: "100px",
        right: "16px",
        zIndex: 9999,
      }}
    >
      {message}
    </Alert>
  );

  return (
    <>
      {showAlert && (
        <AlertMessage
          severity={showAlert ? "error" : "success"}
          message={showAlert}
          onClose={() => setShowAlert(null)}
        />
      )}

      <Box mt={10}>
        <Typography variant="h4" component="h2">
          Wishlist
        </Typography>
        {wishlistBreweries.length > 0 ? (
          <List>
            {wishlistBreweries.map((brewery) => (
              <ListItem key={brewery.id} disablePadding>
                <Box py={2}>
                  {/* Add Link to the BreweriesDetails page */}
                  <Tooltip title={"Visit Brewery"}>
                    <Typography
                      variant="h6"
                      component={Link}
                      to={`/Breweries/${brewery.id}`}
                    >
                      {brewery.name}
                    </Typography>
                  </Tooltip>
                  <Typography variant="body2">
                    Address: {brewery.address_1}, {brewery.city},{" "}
                    {brewery.state}, {brewery.country}
                  </Typography>
                </Box>
                <IconButton
                  aria-label="remove from wishlist"
                  onClick={() => handleToggleWishlist(brewery)}
                >
                  <Tooltip
                    title={
                      isBreweryInWishlist(brewery.id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {isBreweryInWishlist(brewery.id) ? (
                      <StarIcon />
                    ) : (
                      <StarOutlineIcon />
                    )}
                  </Tooltip>
                </IconButton>
                <Divider />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" color={"error"}>
            No breweries in wishlist.
          </Typography>
        )}
        <Box mt={2}>
          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            size="large"
          >
            Back to Breweries
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default WishlistPage;

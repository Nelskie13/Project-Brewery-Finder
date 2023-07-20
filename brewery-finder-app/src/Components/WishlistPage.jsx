import React from "react";
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
} from "@mui/material";
import {
  StarBorder as StarOutlineIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import {
  addToWishlist,
  removeFromWishlist,
} from "../Redux-store/WishlistSlice"; // Update the path accordingly

const WishlistPage = () => {
  const dispatch = useDispatch();
  const wishlistBreweries = useSelector((state) => state.wishlist.breweries);

  const isBreweryInWishlist = (breweryId) =>
    wishlistBreweries.some((brewery) => brewery.id === breweryId);

  const handleToggleWishlist = (brewery) => {
    if (isBreweryInWishlist(brewery.id)) {
      dispatch(removeFromWishlist(brewery.id));
    } else {
      dispatch(addToWishlist(brewery));
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h2" mt={8}>
        Wishlist
      </Typography>
      {wishlistBreweries.length > 0 ? (
        <List>
          {wishlistBreweries.map((brewery) => (
            <ListItem key={brewery.id} disablePadding>
              <Box py={2}>
                <Typography variant="h6">{brewery.name}</Typography>
                <Typography variant="body2">
                  Address: {brewery.address_1}, {brewery.city}, {brewery.state},{" "}
                  {brewery.country}
                </Typography>
              </Box>
              <IconButton
                aria-label="remove from wishlist"
                onClick={() => handleToggleWishlist(brewery)}
              >
                {isBreweryInWishlist(brewery.id) ? (
                  <StarIcon />
                ) : (
                  <StarOutlineIcon />
                )}
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
  );
};

export default WishlistPage;

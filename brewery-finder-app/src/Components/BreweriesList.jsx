import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesData } from "../Redux-store/BreweryListSlice";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import {
  StarBorder as StarOutlineIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  addToWishlist,
  removeFromWishlist,
} from "../Redux-store/WishlistSlice";

const LoadingState = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="300px"
  >
    <CircularProgress size={48} />
  </Box>
);

const ErrorState = ({ error }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="300px"
  >
    <Typography variant="body1" color="error">
      Error: {error}
    </Typography>
  </Box>
);

const BreweriesList = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.breweries);

  useEffect(() => {
    dispatch(fetchBreweriesData());
  }, [dispatch]);

  const wishlistBreweries = useSelector((state) => state.wishlist.breweries);
  const isBreweryInWishlist = (breweryId) =>
    wishlistBreweries.some((brewery) => brewery.id === breweryId);

  const handleToggleWishlist = (breweryId) => {
    if (isBreweryInWishlist(breweryId)) {
      dispatch(removeFromWishlist(breweryId));
    } else {
      dispatch(addToWishlist(breweryId));
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <Box>
      <Typography variant="h4" component="h2" mt={8}>
        List of Breweries
      </Typography>
      {data.length > 0 ? (
        <List>
          {data.map((brewery) => (
            <ListItem
              key={brewery.id}
              component={Link}
              to={`/Breweries/${brewery.id}`}
              sx={{ textDecoration: "none", color: "inherit" }}
            >
              <Box py={2}>
                <Typography variant="h6">{brewery.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Address: {brewery.street}, {brewery.city}, {brewery.state}{" "}
                  {brewery.country}
                </Typography>
              </Box>

              <IconButton
                aria-label="add to wishlist"
                onClick={() => handleToggleWishlist(brewery)}
                sx={{
                  color: isBreweryInWishlist(brewery.id) ? "gold" : "inherit",
                }}
              >
                {isBreweryInWishlist(brewery.id) ? (
                  <StarIcon />
                ) : (
                  <StarOutlineIcon />
                )}
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No breweries found.</Typography>
      )}
    </Box>
  );
};

export default BreweriesList;

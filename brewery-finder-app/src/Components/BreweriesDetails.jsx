import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesDetailsData } from "../Redux-store/BreweryDetailsSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
} from "@mui/material";
import {
  StarBorder as StarOutlineIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import Maps from "./Maps";
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

const BreweryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.breweriesDetails
  );

  useEffect(() => {
    dispatch(fetchBreweriesDetailsData(id));
  }, [dispatch, id]);

  const wishlistBreweries = useSelector((state) => state.wishlist.breweries);
  const isBreweryInWishlist = (breweryId) =>
    wishlistBreweries.some((brewery) => brewery.id === breweryId);

  const handleToggleWishlist = () => {
    if (isBreweryInWishlist(data.id)) {
      dispatch(removeFromWishlist(data.id));
    } else {
      dispatch(addToWishlist(data));
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  // Check if the data object is not null before rendering the Maps component
  if (!data) {
    return null; // Return null or display a message if the data is null
  }

  const { name, street, city, state, country, latitude, longitude, phone } =
    data;

  // Convert latitude and longitude from strings to numbers
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  // Check if latitude and longitude are valid before rendering the Maps component
  if (isNaN(lat) || isNaN(lng)) {
    return (
      <Box>
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body1">
          Address: {street}, {city}, {state}, {country}.
        </Typography>
        <Typography variant="body1" color={"error"}>
          Invalid location data.
        </Typography>
        <IconButton
          aria-label="add to wishlist"
          onClick={() => handleToggleWishlist(id)}
          sx={{ color: isBreweryInWishlist(id) ? "gold" : "inherit" }}
        >
          {isBreweryInWishlist(id) ? <StarIcon /> : <StarOutlineIcon />}
        </IconButton>
      </Box>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2, pb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {name}
      </Typography>
      <Typography>
        Address: {street}, {city}, {state}, {country}.
      </Typography>
      {!phone ? (
        <Typography>Phone: N/A</Typography>
      ) : (
        <Typography>Phone: {phone}</Typography>
      )}
      <IconButton
        aria-label="add to wishlist"
        onClick={() => handleToggleWishlist(id)}
        sx={{ color: isBreweryInWishlist(id) ? "gold" : "inherit" }}
      >
        {isBreweryInWishlist(id) ? <StarIcon /> : <StarOutlineIcon />}
      </IconButton>
      {/* Pass the latitude and longitude as numbers to the Maps component */}
      <Maps latitude={lat} longitude={lng} />
    </Paper>
  );
};

export default BreweryDetails;

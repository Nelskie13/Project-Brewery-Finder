import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesDetailsData } from "../Redux-store/BreweryDetailsSlice";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  IconButton,
  Alert,
  Tooltip,
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

const BreweryDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector(
    (state) => state.breweriesDetails
  );

  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    dispatch(fetchBreweriesDetailsData(id));
  }, [dispatch, id]);

  const wishlistBreweries = useSelector((state) => state.wishlist.breweries);
  const isBreweryInWishlist = (breweryId) =>
    wishlistBreweries.some((brewery) => brewery.id === breweryId);

  const handleToggleWishlist = () => {
    if (isBreweryInWishlist(data.id)) {
      dispatch(removeFromWishlist(data.id));
      setShowAlert("Removed from Wishlist!");
    } else {
      dispatch(addToWishlist(data));
      setShowAlert("Added to Wishlist!");
    }

    // Set a timeout to hide the alert after 3 seconds
    setTimeout(() => {
      setShowAlert(null);
    }, 2000);
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

  const {
    name,
    street,
    city,
    state,
    country,
    latitude,
    longitude,
    phone,
    website_url,
  } = data;

  // Convert latitude and longitude from strings to numbers
  const lat = parseFloat(latitude);
  const lng = parseFloat(longitude);

  // Check if latitude and longitude are valid before rendering the Maps component
  if (isNaN(lat) || isNaN(lng)) {
    return (
      <>
        {showAlert && (
          <AlertMessage
            severity={isBreweryInWishlist(id) ? "error" : "success"}
            message={showAlert}
            onClose={() => setShowAlert(null)}
          />
        )}

        <Paper
          elevation={10}
          sx={{ p: 2, pb: 4, pt: 3, position: "relative", mt: 8 }}
        >
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body1">
            Address: {street}, {city}, {state}, {country}.
          </Typography>
          {!website_url ? (
            <Typography>Website: N/A</Typography>
          ) : (
            <Tooltip title={"View website"}>
              <Typography>
                Website:{" "}
                <a href={website_url} target="_blank" rel="noreferrer">
                  {website_url}
                </a>
              </Typography>
            </Tooltip>
          )}
          <Typography variant="body1" color={"error"}>
            Invalid location data.
          </Typography>
          <IconButton
            aria-label="add to wishlist"
            onClick={() => handleToggleWishlist(id)}
            sx={{
              position: "absolute",
              color: isBreweryInWishlist(id) ? "gold" : "inherit",
              left: "90%",
              top: "30px",
            }}
          >
            <Tooltip
              title={
                isBreweryInWishlist(id)
                  ? "Remove from wishlist"
                  : "Add to wishlist"
              }
            >
              {isBreweryInWishlist(id) ? <StarIcon /> : <StarOutlineIcon />}
            </Tooltip>
          </IconButton>
        </Paper>
      </>
    );
  }

  return (
    <>
      {showAlert && (
        <AlertMessage
          severity={isBreweryInWishlist(id) ? "error" : "success"}
          message={showAlert}
          onClose={() => setShowAlert(null)}
        />
      )}

      <Paper
        elevation={10}
        sx={{ p: 2, pb: 4, pt: 3, position: "relative", mt: 8 }}
      >
        <IconButton
          aria-label="add to wishlist"
          onClick={() => handleToggleWishlist(id)}
          sx={{
            position: "absolute",
            color: isBreweryInWishlist(id) ? "gold" : "inherit",
            left: "90%",
            top: "30px",
          }}
        >
          <Tooltip
            title={
              isBreweryInWishlist(id)
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
          >
            {isBreweryInWishlist(id) ? <StarIcon /> : <StarOutlineIcon />}
          </Tooltip>
        </IconButton>

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

        {!website_url ? (
          <Typography>Website: N/A</Typography>
        ) : (
          <Tooltip title={"View website"}>
            <Typography>
              Website:{" "}
              <a href={website_url} target="_blank" rel="noreferrer">
                {website_url}
              </a>
            </Typography>
          </Tooltip>
        )}
        {/* Pass the latitude and longitude as numbers to the Maps component */}
        <Maps latitude={lat} longitude={lng} />
      </Paper>
    </>
  );
};

export default BreweryDetails;

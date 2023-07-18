import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesDetailsData } from "../Redux-store/BreweryDetailsSlice";
import { Box, Typography, CircularProgress } from "@mui/material";
import Maps from "./Maps";

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

  const { name, street, city, state, country, latitude, longitude } = data;

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
        <Typography variant="body1">Invalid location data.</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body1">
        Address: {street}, {city}, {state}, {country}.
      </Typography>
      {/* Pass the latitude and longitude as numbers to the Maps component */}
      <Maps latitude={lat} longitude={lng} />
    </Box>
  );
};

export default BreweryDetails;

import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesDetailsData } from "../Redux-store/BreweryDetailsSlice";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";
import Maps from "./Maps";

const LoadingState = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="300px"
  >
    <Spinner size="lg" />
  </Box>
);

const ErrorState = ({ error }) => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="300px"
  >
    <Text>Error: {error}</Text>
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
      <div>
        <Heading as="h3" size="md">
          {name}
        </Heading>
        <Text>
          Address: {street}, {city}, {state}, {country}.
        </Text>
        <Text>Invalid location data.</Text>
      </div>
    );
  }

  return (
    <Box>
      <Heading as="h3" size="md">
        {name}
      </Heading>
      <Text>
        Address: {street}, {city}, {state}, {country}.
      </Text>
      {/* Pass the latitude and longitude as numbers to the Maps component */}
      <Maps latitude={lat} longitude={lng} />
    </Box>
  );
};

export default BreweryDetails;

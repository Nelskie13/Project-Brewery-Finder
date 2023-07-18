import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesDetailsData } from "../Redux-store/BreweryDetailsSlice";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";

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

  return (
    <Box>
      {data && (
        <>
          <Heading as="h3" size="md">
            {data.name}
          </Heading>
          <Text>
            Address: {data.street}, {data.city}, {data.state}, {""}
            {data.country}.
          </Text>
        </>
      )}
    </Box>
  );
};

export default BreweryDetails;

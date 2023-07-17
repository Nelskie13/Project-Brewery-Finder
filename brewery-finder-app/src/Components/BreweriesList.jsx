import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesData } from "../Redux-store/BreweryListSlice";
import {
  Box,
  Heading,
  Text,
  Spinner,
  UnorderedList,
  ListItem,
  Stack,
} from "@chakra-ui/react";

const BreweriesList = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.breweries);

  useEffect(() => {
    dispatch(fetchBreweriesData());
  }, [dispatch]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <Spinner size="lg" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
      >
        <Text>Error: {error}</Text>
      </Box>
    );
  }

  return (
    <Stack>
      <Heading as="h2" size="lg">
        List of Breweries
      </Heading>
      <UnorderedList>
        {data.map((brewery) => (
          <ListItem key={brewery.id}>
            {brewery.name}
            <Text>
              Address: {brewery.address_1}, {brewery.city},{" "}
              {brewery.state_province}
            </Text>
          </ListItem>
        ))}
      </UnorderedList>
    </Stack>
  );
};

export default BreweriesList;

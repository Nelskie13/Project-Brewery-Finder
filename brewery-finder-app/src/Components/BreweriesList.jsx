import { useEffect } from "react";
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
import { Link } from "react-router-dom";

// Create a separate component for displaying loading state
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

// Create a separate component for displaying error state
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

const BreweriesList = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.breweries);

  useEffect(() => {
    dispatch(fetchBreweriesData());
  }, [dispatch]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <Stack>
      <Heading as="h2" size="lg">
        List of Breweries
      </Heading>
      {data.length > 0 ? (
        <UnorderedList>
          {data.map((brewery) => (
            <ListItem key={brewery.id}>
              <Link to={`/Breweries/${brewery.id}`}>
                {brewery.name}
                <Text>
                  Address: {brewery.street}, {brewery.city}, {brewery.state}{" "}
                  {""}
                  {brewery.country}
                </Text>
              </Link>
            </ListItem>
          ))}
        </UnorderedList>
      ) : (
        <Text>No breweries found.</Text>
      )}
    </Stack>
  );
};

export default BreweriesList;

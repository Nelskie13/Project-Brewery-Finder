import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesData } from "../Redux-store/BreweryListSlice";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

// Create a separate component for displaying loading state
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

// Create a separate component for displaying error state
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

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h4" component="h2" mt={10}>
        List of Breweries
      </Typography>
      {data.length > 0 ? (
        <List>
          {data.map((brewery) => (
            <ListItem
              key={brewery.id}
              component={Link}
              to={`/Breweries/${brewery.id}`}
            >
              <Typography variant="body1">{brewery.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                Address: {brewery.street}, {brewery.city}, {brewery.state}{" "}
                {brewery.country}
              </Typography>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No breweries found.</Typography>
      )}
    </Stack>
  );
};

export default BreweriesList;

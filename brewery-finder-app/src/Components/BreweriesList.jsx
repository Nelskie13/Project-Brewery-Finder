import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesData } from "../Redux-store/BreweryListSlice";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";
import { Link } from "react-router-dom";

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

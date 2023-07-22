import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBreweriesData } from "../Redux-store/BreweryListSlice";
import {
  Box,
  Typography,
  CircularProgress,
  List,
  ListItem,
  IconButton,
  Alert,
  Tooltip,
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

const StarIconButton = ({ isStarred, onClick }) => (
  <IconButton
    aria-label="toggle wishlist"
    onClick={onClick}
    sx={{
      color: isStarred ? "gold" : "inherit",
    }}
  >
    <Tooltip title={isStarred ? "Remove from wishlist" : "Add to wishlist"}>
      {isStarred ? <StarIcon /> : <StarOutlineIcon />}
    </Tooltip>
  </IconButton>
);

const BreweryCard = ({ brewery, isWishlist, onToggleWishlist }) => {
  const isBreweryInWishlist = (breweryId) =>
    isWishlist.some((brewery) => brewery.id === breweryId);

  const handleToggleWishlist = (event) => {
    event.preventDefault(); // Prevent the default button behavior
    onToggleWishlist(brewery);
  };

  return (
    <Box
      borderRadius={8}
      boxShadow={2}
      p={2}
      bgcolor="background.paper"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mb={2}
    >
      <Box>
        <Typography variant="h6">{brewery.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          Address: {brewery.street}, {brewery.city}, {brewery.state}{" "}
          {brewery.country}
        </Typography>
      </Box>
      <StarIconButton
        isStarred={isBreweryInWishlist(brewery.id)}
        onClick={handleToggleWishlist}
      />
    </Box>
  );
};

const BreweriesList = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.breweries);
  const wishlistBreweries = useSelector((state) => state.wishlist.breweries);
  const [showAlert, setShowAlert] = useState(null);

  useEffect(() => {
    dispatch(fetchBreweriesData());
  }, [dispatch]);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  const handleToggleWishlist = (brewery) => {
    if (wishlistBreweries.some((b) => b.id === brewery.id)) {
      dispatch(removeFromWishlist(brewery.id));
      setShowAlert("Removed from Wishlist!");
    } else {
      dispatch(addToWishlist(brewery));
      setShowAlert("Added to Wishlist!");
    }

    // Set a timeout to hide the alerts after 3 seconds
    setTimeout(() => {
      setShowAlert(null);
    }, 2000);
  };

  return (
    <>
      {showAlert && (
        <AlertMessage
          severity={showAlert ? "success" : "error "}
          message={showAlert}
          onClose={() => setShowAlert(null)}
        />
      )}
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
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <BreweryCard
                  brewery={brewery}
                  isWishlist={wishlistBreweries}
                  onToggleWishlist={handleToggleWishlist}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1">No breweries found.</Typography>
        )}
      </Box>
    </>
  );
};

export default BreweriesList;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBreweriesSearchData } from "../Redux-store/BrewerySearchSlice";
import {
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Stack,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import BreweryDetails from "./BreweriesDetails"; // Import the BreweryDetails component

const BrewerySearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBrewery, setSelectedBrewery] = useState(null); // State to store the selected brewery
  const [noResults, setNoResults] = useState(false); // State to track if no results were found

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value.trim() !== "") {
      setLoading(true);
      // Debounce the search with a setTimeout
      // Adjust the delay (e.g., 300ms) based on your preference
      setTimeout(() => {
        dispatch(fetchBreweriesSearchData(value.trim())).then((action) => {
          setLoading(false);
          if (action.payload && action.payload.length > 0) {
            setSearchResults(action.payload);
            setNoResults(false); // Reset noResults state when results are found
          } else {
            setSearchResults([]);
            setNoResults(true); // Set noResults state when no results are found
          }
        });
      }, 300);
    } else {
      setSearchResults([]);
      setNoResults(false); // Reset noResults state when search term is empty
    }
  };

  const handleBreweryClick = (brewery) => {
    setSelectedBrewery(brewery);
  };

  return (
    <Stack spacing={2} mt={10}>
      <Typography variant="h4" component="h2">
        Search Breweries
      </Typography>
      <TextField
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search breweries..."
        fullWidth
        variant="outlined"
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {noResults ? (
            <Typography variant="body1" color={"error"}>
              No results found.
            </Typography>
          ) : (
            searchResults.length > 0 && (
              <>
                <Paper elevation={3} sx={{ p: 1 }}>
                  <List>
                    {searchResults.map((brewery) => (
                      <ListItem
                        key={brewery.id}
                        onClick={() => handleBreweryClick(brewery)}
                      >
                        <Link
                          to={`/Breweries/${brewery.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <ListItemText primary={brewery.name} />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                {selectedBrewery && (
                  <BreweryDetails brewery={selectedBrewery} />
                )}
              </>
            )
          )}
        </>
      )}
    </Stack>
  );
};

export default BrewerySearch;

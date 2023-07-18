import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBreweriesSearchData } from "../Redux-store/BrewerySearchSlice";
import {
  Heading,
  Input,
  UnorderedList,
  ListItem,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import BreweryDetails from "./BreweriesDetails"; // Import the BreweryDetails component

const BrewerySearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBrewery, setSelectedBrewery] = useState(null); // State to store the selected brewery

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
          if (action.payload) {
            setSearchResults(action.payload);
          }
        });
      }, 300);
    } else {
      setSearchResults([]);
    }
  };

  const handleBreweryClick = (brewery) => {
    setSelectedBrewery(brewery);
  };

  return (
    <Stack>
      <Heading as="h2" size="lg">
        Search Breweries
      </Heading>
      <Input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search breweries..."
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        searchResults.length > 0 && (
          <>
            <UnorderedList>
              {searchResults.map((brewery) => (
                <ListItem
                  key={brewery.id}
                  onClick={() => handleBreweryClick(brewery)}
                >
                  <Link to={`/Breweries/${brewery.id}`}>{brewery.name}</Link>
                </ListItem>
              ))}
            </UnorderedList>
            {selectedBrewery && <BreweryDetails brewery={selectedBrewery} />}
          </>
        )
      )}
    </Stack>
  );
};

export default BrewerySearch;

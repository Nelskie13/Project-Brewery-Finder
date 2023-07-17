import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchBreweriesSearchData } from "../Redux-store/BrewerySearchSlice";
import {
  Heading,
  Input,
  UnorderedList,
  ListItem,
  Stack,
} from "@chakra-ui/react";

const BrewerySearch = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);

    if (value.trim() !== "") {
      dispatch(fetchBreweriesSearchData(value.trim())).then((action) => {
        if (action.payload) {
          setSearchResults(action.payload);
        }
      });
    } else {
      setSearchResults([]);
    }
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
      {searchResults.length > 0 && (
        <UnorderedList>
          {searchResults.map((brewery) => (
            <ListItem key={brewery.id}>{brewery.name}</ListItem>
          ))}
        </UnorderedList>
      )}
    </Stack>
  );
};

export default BrewerySearch;

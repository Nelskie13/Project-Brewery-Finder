import { ChakraProvider } from "@chakra-ui/react";
import BreweriesList from "./Components/BreweriesList";
import BreweriesSearchBar from "./Components/BreweriesSearchBar";

function App() {
  return (
    <ChakraProvider>
      <BreweriesSearchBar />
      <BreweriesList />
    </ChakraProvider>
  );
}

export default App;

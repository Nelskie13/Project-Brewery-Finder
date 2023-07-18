import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import BreweriesList from "./Components/BreweriesList";
import BreweriesSearchBar from "./Components/BreweriesSearchBar";
import BreweriesDetails from "./Components/BreweriesDetails";
import Maps from "./Components/Maps";

const BreweriesContainer = () => (
  <>
    <Maps latitude={14.653175469001901} longitude={121.11740503132656} />
    <BreweriesSearchBar />
    <BreweriesList />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<BreweriesContainer />} />
      <Route path="/Breweries/:id" element={<BreweriesDetails />} />
    </>
  )
);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;

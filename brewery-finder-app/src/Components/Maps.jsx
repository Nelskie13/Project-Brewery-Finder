import { useState, useCallback, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Box, CircularProgress, Typography } from "@mui/material";

const API_KEY = process.env.REACT_APP_API_KEY;

function Maps({ latitude, longitude }) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  const [map, setMap] = useState(null);
  const [latlong, setLatLong] = useState({ lat: latitude, lng: longitude });
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    setLatLong({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  useEffect(() => {
    if (isLoaded) {
      setIcon({
        url: "https://cdn-icons-png.flaticon.com/512/4821/4821951.png",
        scaledSize: new window.google.maps.Size(70, 70), // Adjust the size of the icon as needed
      });
    }
  }, [isLoaded]);

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  const onUnmount = useCallback((map) => {
    setMap(null);
  }, []);

  if (loadError) {
    return (
      <Typography variant="body1" color="error">
        Failed to load Google Maps API.
      </Typography>
    );
  }

  return (
    <Box
      height="600px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {!isLoaded ? (
        <CircularProgress />
      ) : (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={latlong}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {icon && map && <Marker position={latlong} icon={icon} />}
        </GoogleMap>
      )}
    </Box>
  );
}

export default Maps;

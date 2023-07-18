import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const API_KEY = "AIzaSyCq71N1GHDQWEhBF16jWgKY-pN4nM0fUFM";

function Maps({ latitude, longitude }) {
  const [map, setMap] = useState(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  useEffect(() => {
    // Update the map center if latitude or longitude props change
    setMap((prevMap) => ({
      ...prevMap,
      center: {
        lat: latitude,
        lng: longitude,
      },
    }));
  }, [latitude, longitude]);

  const handleLoad = (map) => {
    setMap(map);
  };

  const handleUnmount = () => {
    setMap(null);
  };

  const handleMapClick = (e) => {
    // Update the center state with the clicked coordinates
    setMap((prevMap) => ({
      ...prevMap,
      center: {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    }));
  };

  return (
    <>
      {loadError ? (
        <div>Error loading Google Map</div>
      ) : isLoaded && map ? (
        // Render the map only when it's loaded and map is available
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "700px" }}
          center={{
            lat: latitude,
            lng: longitude,
          }}
          zoom={15}
          onLoad={handleLoad}
          onUnmount={handleUnmount}
          onClick={handleMapClick}
        >
          {map && <Marker position={{ lat: latitude, lng: longitude }} />}
        </GoogleMap>
      ) : (
        <div>Loading Google Map...</div>
      )}
    </>
  );
}

export default Maps;

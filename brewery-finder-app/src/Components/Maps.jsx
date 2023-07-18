import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const API_KEY = "AIzaSyCq71N1GHDQWEhBF16jWgKY-pN4nM0fUFM";

const defaultCenter = {
  lat: 14.641196962144695,
  lng: 121.12191730346366,
};

function Maps() {
  const [map, setMap] = useState(null);
  const [latlong, setLatLong] = useState(defaultCenter);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
  });

  useEffect(() => {
    // Set the default center once the map is loaded
    if (isLoaded && !latlong) {
      setLatLong(defaultCenter);
    }
  }, [isLoaded, latlong]);

  const handleLoad = (map) => {
    setMap(map);
  };

  const handleUnmount = () => {
    setMap(null);
  };

  const handleMapClick = (e) => {
    // Update the center state with the clicked coordinates
    setLatLong({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  return (
    <>
      {loadError ? (
        <div>Error loading Google Map</div>
      ) : isLoaded && latlong ? ( // Render the map only when it's loaded and latlong is available
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "500px" }}
          center={latlong}
          zoom={19}
          onLoad={handleLoad}
          onUnmount={handleUnmount}
          onClick={handleMapClick}
        >
          {map && <Marker position={latlong} />}
        </GoogleMap>
      ) : (
        <div>Loading Google Map...</div>
      )}
    </>
  );
}

export default Maps;

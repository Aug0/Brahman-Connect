import { useEffect, useState } from "react";

export default function useUserLocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setLocation({ lat, lng });
        setError(null);
      },
      (err) => {
        console.log(err);
        if (err.code === 1) {
          setError("Location access denied. Please allow location permission.");
        } else if (err.code === 2) {
          setError("Location unavailable.");
        } else if (err.code === 3) {
          setError("Location request timed out.");
        } else {
          setError("An unknown error occurred.");
        }
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    location,
    error,
    getLocation,
    googleMapsLink: location
      ? `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
      : null,
  };
}

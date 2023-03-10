import {useEffect, useState} from 'react';
import { useLoadScript, GoogleMap, MarkerF } from "@react-google-maps/api";
import { useShow } from "@pankod/refine-core";
import { Stack } from "@pankod/refine-mui";

/* function getLatLng(location: string): {lat: number, lng: number } {
  let coordinates = {lat: 0, lng: 0};
    
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBlFwlJ5QJwT80q3KHXbQXvggUG-aX9_YU`)
    .then(response => response.json())
    .then(data => {
    coordinates.lat = data.results[0].geometry.location.lat
    coordinates.lng = data.results[0].geometry.location.lng
    console.log(coordinates)
    });
  return coordinates;
} */
/* async function getLatLng(location: string) {
  let response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBlFwlJ5QJwT80q3KHXbQXvggUG-aX9_YU`);
  let data = await response.json();
  let coordinates = data.results[0].geometry.location
  return coordinates;
} */
async function getLatLng(location: string): Promise<any> {
  const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=AIzaSyBlFwlJ5QJwT80q3KHXbQXvggUG-aX9_YU`);
  const data = await response.json();

  if (data.status === 'OK') {
    let coordinates = data.results[0].geometry.location;
    return coordinates
  } else {
    throw new Error('Unable to find coordinates for the given location');
  }
}

const Map = () => {
    const { queryResult } = useShow();
    const { data } = queryResult;
    const propertyDetails = data?.data ?? {};
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyA9jyj2nXVOVf6vmdUcNIJ0jkiPwf0W3oU",
      });
    
    const [coordinates, setCoordinates] = useState({lat: 0, lng: 0});

    useEffect(() => {
        getLatLng(propertyDetails.location).then(coordinates => {
          setCoordinates(coordinates);
        });
    }, [propertyDetails.location]);
    

    if (!isLoaded) return <div>Map Loading...</div>
    
  return (
    <Stack>
    <GoogleMap zoom={10} center={coordinates} mapContainerClassName="map-container">
      <MarkerF position={coordinates} />
    </GoogleMap>
    </Stack>
  )
}

export default Map
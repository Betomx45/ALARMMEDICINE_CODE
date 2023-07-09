import  {UseGeolocated}  from "react-geolocated";
import { useRouter } from "next/router";
import  {useState}  from 'react';


const IndexPage = () => {
    const [location, setLocation] = useState("");
  
    const handleGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error al obtener la ubicación:', error);
          }
        );
      } else {
        console.error('La geolocalización no es compatible en este navegador.');
      }
    };
  
    return (
      <div>
        <h1>Geolocalización en Next.js</h1>
        <button onClick={handleGeolocation}>Obtener Geolocalización</button>
        {location && (
          <div>
            <p>Latitud: {location.latitude}</p>
            <p>Longitud: {location.longitude}</p>
          </div>
        )}
      </div>
    );
  };
  
  export default IndexPage;
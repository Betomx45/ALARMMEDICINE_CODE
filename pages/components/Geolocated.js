import { Geolocated } from 'react-geolocated';

const MyComponent = () => {
  return (
    <div>
      <h1>Geolocalización en Next.js con react-geolocated</h1>
      <Geolocated
        render={({ isGeolocationAvailable, isGeolocationEnabled, coords }) => {
          if (!isGeolocationAvailable) {
            return <div>La geolocalización no está disponible en este navegador.</div>;
          }

          if (!isGeolocationEnabled) {
            return <div>La geolocalización no está habilitada.</div>;
          }

          if (coords) {
            return (
              <div>
                <p>Latitud: {coords.latitude}</p>
                <p>Longitud: {coords.longitude}</p>
              </div>
            );
          }

          return <div>Obteniendo ubicación...</div>;
        }}
      />
    </div>
  );
};

export default MyComponent;
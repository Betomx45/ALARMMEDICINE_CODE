import { useState } from 'react';

const Ubicacion = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });

          // Enviar la ubicación al backend
          fetch('/api/ubicacion', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              latitud: position.coords.latitude,
              longitud: position.coords.longitude
            })
          })
            .then(response => response.json())
            .then(data => {
              console.log('Ubicación enviada al backend:', data);
            })
            .catch(error => {
              console.error('Error al enviar la ubicación al backend:', error);
            });
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
          setError('Error al obtener la ubicación. Asegúrate de habilitar la geolocalización en tu navegador.');
        }
      );
    } else {
      setError('La geolocalización no es compatible en este navegador.');
    }
  };

  return (
    <div>
      <h1>Geolocalización en Next.js</h1>
      <button onClick={handleGeolocation}>Obtener Geolocalización</button>
      {error && <p>{error}</p>}
      {location && (
        <div>
          <p>Latitud: {location.latitude}</p>
          <p>Longitud: {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default Ubicacion;

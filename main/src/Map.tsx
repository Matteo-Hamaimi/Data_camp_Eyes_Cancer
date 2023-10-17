import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';




const Map: React.FC = () => {
  const mapRef = useRef<null | L.Map>(null);
  const [searchValue, setSearchValue] = useState<string>(''); // Assurez-vous de spécifier le type de l'état ici

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Utilisez la valeur de recherche pour effectuer une action (par exemple, déplacer la carte vers la région recherchée)
    // Vous devrez implémenter la logique de recherche ici.
  };
  

  useEffect(() => {
    if (!mapRef.current) {
      // La carte n'est pas encore initialisée, initialisons-la
      const map = L.map('map').setView([48.77, 1.19], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);




      // Stockons la référence de la carte dans la variable de ref
      mapRef.current = map;
    }
  }, []);

  return (
    <div>
    <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} onSubmit={handleSearchSubmit}>
        <input style={{ width: '300px'}}
          type="text"
          placeholder=""
          value={searchValue}
          onChange={handleSearchChange}
        />
        <button type="submit">Rechercher</button>
      </form>
    <div id="map" style={{ height: '600px', width: '1500px', margin: '0 auto', borderRadius: '50px' }}></div>
    </div>
  );
};

export default Map;

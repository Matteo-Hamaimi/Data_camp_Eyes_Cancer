import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';
import Mathis from "./assets/MathisPappo.jpg";
import Loupe from "./assets/loupe.png";
import AidKit from "./assets/first-aid-kit.png";
import * as Papa from 'papaparse';
import { ParseResult } from 'papaparse';



const FindDoctor: React.FC = () => {
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
      const map = L.map('map').setView([48.876168, 2.345074], 13);
  
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);
  
      mapRef.current = map;
  
      // Lire les données CSV et afficher les médecins sur la carte
      Papa.parse('./medecins.csv', {
        delimiter: ';',  // Définissez le délimiteur correct
        header: true,
        dynamicTyping: true,
        complete: function (results: ParseResult<any>) {
          results.data.forEach((medecin: Record<string, any>) => {
            // Vérifiez les coordonnées (latitude et longitude) dans les données
            if (medecin.Coordonnées) {
              const [latitude, longitude] = medecin.Coordonnées.split(',').map(parseFloat);
              if (!isNaN(latitude) && !isNaN(longitude)) {
                const marker = L.marker([latitude, longitude]).addTo(map);
                marker.bindPopup(medecin["Nom du professionnel"]); // Afficher le nom du médecin au clic
              }
            }
          });
        },
      });
    }
  }, []);

  return (
    <div className='formMap'>
      <div className='formulaire'>
        <form onSubmit={handleSearchSubmit} style={{paddingBottom: "30px" }}>
          <input
            type="text"
            placeholder="chercher un docteur"
            value={searchValue}
            onChange={handleSearchChange}
            style={{ textAlign: 'center', borderRadius: '50px' }}
          />
          <button type="submit">
            <img src={Loupe} alt="loupe" style={{ height: "20px", width: "20px", marginLeft: "10px" }}/>
          </button>
        </form>
        <div className="profilDoc">
          <img className="w-20 h-20 rounded-full m-2" src={Mathis} alt=""/>
          <div className="font-medium dark:text-white m-3">
            <div>Dr. Tanpa Pamrih</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">General Practitioner</div>
          </div>
        </div>
        <div className='experience'>
          <img src={AidKit} alt="Aid-Kit" style={{ height: "20px", width: "20px" }}/>
          <div>5 year experiences</div>
        </div>
      </div>
      <div id="map" className='maps' style={{ height: 'calc(100vh - 120px)', width: '1000px' }}/>
    </div>
  );
};

export default FindDoctor;

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './App.css';
import Female from "./assets/Profile F.png";
import Male from "./assets/Profile M.png";
import icon from "./assets/Loc.png";
import doctors from './doctors'; // Importez la liste de médecins depuis le fichier doctors.js
import { Doctor } from './Types';


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
  
  // Créez une fonction pour gérer le clic sur un médecin
  const handleDoctorClick = (doctor: Doctor) => {
    // Vérifiez si la carte est initialisée
    if (mapRef.current) {
      // Récupérez les coordonnées du médecin
      const { latitude, longitude } = doctor;
      // Ajustez le zoom de la carte pour afficher les coordonnées du médecin
      mapRef.current.setView([latitude, longitude], 13);
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      // La carte n'est pas encore initialisée, initialisons-la
      const map = L.map('map').setView([48.876168, 2.345074], 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      doctors.forEach((doctor) => {
        const customIcon = L.icon({
          iconUrl: icon, // Spécifiez l'URL de l'icône personnalisée
          iconSize: [30, 30], // Spécifiez la taille de l'icône (ajustez-la en fonction de votre image)
          iconAnchor: [15, 30], // Spécifiez l'ancre de l'icône (ajustez-la en fonction de votre image)
        });
      
        const marker = L.marker([doctor.latitude, doctor.longitude], { icon: customIcon }).addTo(map);
        
      });

      
      // Stockons la référence de la carte dans la variable de ref
      mapRef.current = map;
    }
  }, []);

  

  return (
    <div className='formMap'>
      <div id="map" className='maps' style={{ height: '100vh', width: '100%' }} />
      <div className="doctor-list-container">
        {doctors.map((doctor, index) => (
          <div className="doctor-profile" key={index}>
            <div className="doctor-profile" key={index} onClick={() => handleDoctorClick(doctor)}>
            {/* Image en fonction du sexe du médecin */}
            {doctor.gender === 'Male' ? (
              <img src={Male} alt="Male" className="doctor-image" />
            ) : (
              <img src={Female} alt="Female" className="doctor-image" />
            )}
            <div className="doctor-details">
              <div className="doctor-name">{doctor.firstName} {doctor.lastName}</div>
              <div className="doctor-specialization">{doctor.specialization}</div>
            </div>
          </div>
          </div>
        ))}
      </div>
      <div className='formulaire'>
        <form onSubmit={handleSearchSubmit} style={{ paddingBottom: "30px" }}>
          {/* ... */}
        </form>
      </div>
    </div>
  );
};

export default FindDoctor;

// App.tsx
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'; // Utilisez "Routes" au lieu de "Route"
import logo from "./assets/inEYES.png";
import './App.css';
import AboutUs from './AboutUs';
import FindDoctor from './FindDoctor';

function App() {

  async function sendImageForPrediction(imageFile: File): Promise<any> {
    const API_URL = "https://eyedetector-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/dd6a9430-fea0-4ba1-b05b-c41de8e20c82/classify/iterations/Iteration1/image";
    const PREDICTION_KEY = "2a530a0870d04fde9dbd1277358e0608";

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Prediction-Key': PREDICTION_KEY,
                'Content-Type': 'application/octet-stream'
            },
            body: imageFile
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error during prediction API call:', error);
        throw error;
    }
  }
  const fileInput = document.getElementById('large_size') as HTMLInputElement;
  const imageFile = fileInput?.files?.[0];

  if (imageFile) {
      try {
          const predictionResult = sendImageForPrediction(imageFile);
          console.log(predictionResult);
      } catch (error) {
          console.error('Failed to get prediction:', error);
      }
  }


  return (
    <Router>
      <div className="All-App background-image">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
            <nav className='menu'>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
                <li><Link to="/find-doctor">Find doctor</Link></li>
              </ul>
            </nav>
            <button className="text-sm text-white
                m-4 py-2 px-4
                rounded
                font-semibold
                bg-blue-500 text-blue-50
                hover:bg-blue-600
                " id="bbouton">Appointment</button>

          </header>

          <Routes> 
            <Route path="/" element={ // Utilisez "element" au lieu de "component"
              <body>
                <h1 className='titre'>Best Medical and <span style={{color: "#556297" }}>Health</span><br/><span style={{color: '#556297'}}>Care</span> Center</h1>
                <p className='chapeau'><span style={{color: "#556297" }}>We are dedicated to excellence in patient care, patient safety<br/>and the quality of the reliable healthcare experience.</span></p>
              <div className='impDoc'>
                <input type="file" className="text-sm text-gray-600
                m-4
                file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-500 file:text-violet-50
                hover:file:bg-violet-600
                " id="large_size"/>
         
              </div>
              
            </body>
          } />
          <Route path="/about-us" element={ // Utilisez "element" au lieu de "component"
            <AboutUs />
          } />
          <Route path="/find-doctor" element={ // Utilisez "element" au lieu de "component"
            <FindDoctor />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

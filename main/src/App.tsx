// App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'; // Utilisez "Routes" au lieu de "Route"
import logo from "./assets/inEYES.png";
import './App.css';
import AboutUs from './AboutUs';
import FindDoctor from './FindDoctor';


type PredictionItem = {
  probability: number;
  tagId: string;
  tagName: string;
};



function App() {

  

  const [inputFile, setInputFile] = useState<File | null>(null);
  const [data, setData] = useState<{ predictions: PredictionItem[] } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInputFile(event.target.files[0]);
    }
  };

  

  useEffect(() => {
    // Your async operation
    async function sendImageForPrediction() {
      if (inputFile) {
        try {
          const API_URL = "https://eyedetector-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/dd6a9430-fea0-4ba1-b05b-c41de8e20c82/classify/iterations/Iteration1/image";
          const PREDICTION_KEY = "2a530a0870d04fde9dbd1277358e0608";

          const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
              'Prediction-Key': PREDICTION_KEY,
              'Content-Type': 'application/octet-stream'
            },
            body: inputFile
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const result = await response.json();
          console.log('result', result);
          setData(result);
        } catch (error) {
          console.error('Error during prediction API call:', error);
        }
      }
    }

    sendImageForPrediction();
  }, [inputFile]);

  console.log('data', data);
  const diseaseRisk = data?.predictions.find(item => item.tagName === "Disease_Risk");
  const noDisease = data?.predictions.find(item => item.tagName === "No_disease");

  const tagDictionary: { [key: string]: string } = {
    "Disease_Risk": "Presence of disease/abnormality.",
    "DR": "Presence of diabetic retinopathy.",
    "ARMD": "Presence of age-related macular degeneration.",
    "MH": "Presence of media haze.",
    "DN": "Presence of drusen.",
    "MYA": "Presence of myopia.",
    "BRVO": "Presence of branch retinal vein occlusion.",
    "TSLN": "Presence of tessellation."
  };

  // Trier les prédictions par probabilité, en excluant "No_disease"
  const topPredictions = data?.predictions
    .filter(item => item.tagName !== "No_disease" && item.tagName !== "Disease_Risk" )
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 4);



  return (
    <Router>
      <div className="All-App background-image">
        <header>
          <img src={logo} className="App-logo" alt="logo" />
            <nav className='menu'>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/find-doctor">Find doctor</Link></li>
                <li><Link to="/about-us">About Us</Link></li>
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
                <input type="file" onChange={handleFileChange} className="text-sm text-gray-600
                m-4
                file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-500 file:text-violet-50
                hover:file:bg-violet-600
                " id="large_size"/>
                
                {diseaseRisk && diseaseRisk.probability > 0.5 ? (
                  <button 
                  onClick={() => window.location.href='/find-doctor'}
                  style={{ backgroundColor: 'red', color: 'white', borderRadius: 50, padding: 10 }}>
                    You potentially have cancer
                  </button>
                ) : noDisease && noDisease.probability > 0.5 ? (
                  <button 
                  onClick={() => window.location.href='/find-doctor'}
                  style={{ backgroundColor: 'green', color: 'white', borderRadius: 50, padding: 10 }}>
                    You don't have cancer
                  </button>
                ) : null}

                {diseaseRisk && diseaseRisk.probability > 0.5 && (
                <div>
                  <p>Consult a doctor near you as soon as possible. Click the red button.</p>
                  <table style={{ margin: '20px auto', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th>Disease</th>
                        <th>Probability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topPredictions?.map((item, index) => (
                        <tr key={index}>
                          <td>{tagDictionary[item.tagName]}</td>
                          <td>{item.probability.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )}
              </div>
              
            </body>
          } />
          <Route path="/find-doctor" element={ // Utilisez "element" au lieu de "component"
            <FindDoctor />
          } />
          <Route path="/about-us" element={ // Utilisez "element" au lieu de "component"
            <AboutUs />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

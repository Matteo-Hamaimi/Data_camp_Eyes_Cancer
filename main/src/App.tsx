// App.tsx
import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'; // Utilisez "Routes" au lieu de "Route"
import logo from "./assets/inEYES.png";
import './App.css';
import Doc from './Doc';
import AboutUs from './AboutUs';

function App() {
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
              <li><a href='/'>Departments</a></li>
              <li><a href='/'>Contact</a></li>
            </ul>
          </nav>
        </header>

        <Routes> 
          <Route path="/" element={ // Utilisez "element" au lieu de "component"
            <body>
              <h1 className='titre'>Best medical and Health<br/>Care Center</h1>
              <p className='chapeau'>We are dedicated to excellence in patient care, patient safety<br/>and the quality of the reliable healthcare experience.</p>
              <div className='impDoc'>
                <input className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" id="large_size" type="file"/>
              </div>
            </body>
          } />
          <Route path="/about-us" element={ // Utilisez "element" au lieu de "component"
            <AboutUs />
          } />
          <Route path="/find-doctor" element={ // Utilisez "element" au lieu de "component"
            <Doc />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

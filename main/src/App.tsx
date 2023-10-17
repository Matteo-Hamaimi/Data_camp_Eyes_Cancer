import React from 'react';
import logo from "./assets/inEYES.png";
import './App.css';

function App() {
  return (
    <div className="All-App background-image">
      <header>
        <img src={logo} className="App-logo" alt="logo" />

        <nav className='menu'>
          <ul>
            <li><a href='#'>Home</a></li>
            <li><a href='#'>About Us</a></li>
            <li><a href='#'>Find doctor</a></li>
            <li><a href='#'>Departements</a></li>
            <li><a href='#'>Contact</a></li>
          </ul>
        </nav>
      </header>

      <body>
        {/* Health et Care doivent etre en violet */}
        <h1 className='titre'>Best medical and Health<br/>Care Center</h1>
        <p className='chapeau'>We are dedicated  excellence in patient care, patient savety<br/>and the quality of the reliably healcare experience.</p>


        <div className='impDoc'>
          <input className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2" id="large_size" type="file"/>
        </div>

      </body>
    </div>
  );
}

export default App;

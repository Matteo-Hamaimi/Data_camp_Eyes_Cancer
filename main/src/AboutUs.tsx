// Doc.tsx
import React from 'react';
import Mathis from "./assets/MathisPappo.jpg";
import Amanou from "./assets/GabrielAmanou.jpg";
import Mateo from "./assets/MateoHamaimi.jpg";

function AboutUs() {
  return (
    <div>
      <h1 className='titre'>We've got an entire team dedicated<br/>to supporting you and your business</h1>
      <p className='chapeau'>Get help 24/7, with our award-winning support network of payments experts.</p>

      <div className='listeAvatar'>
        <div className='portait'>
          <img src={Mathis} className="rounded w-40 h-100 px-3" alt="mathis avatar" />
          <p className='font-bold'>Mathis Pappo</p>
          <p>Developer</p>
          <br />
          <p className='font-bold'>Call Me</p>
          <p>06 95 96 25 38</p>
          <br />
          <p className='font-bold'>Message Me</p>
          <p>mathis.pappo@efrei.net</p>
        </div>
        <div className='portait'>
          <div className='paddingmerdique'>
            <img src={Amanou} className="rounded w-40 h-100" alt="amanou avatar" />
            <p className='font-bold'>Gabriel Amanou</p>
            <p>Editor/Developer</p>
            <br />
            <p className='font-bold'>Call Me</p>
            <p>06 07 91 73 85</p>
            <br />
            <p className='font-bold'>Message Me</p>
            <p>gabriel.amanou@efrei.net</p>
          </div>
        </div>
        <div className='portait'>
          <img src={Mateo} className="rounded w-40 h-100 px-3" alt="mateo avatar" />
            <p className='font-bold'>Mateo Hamaimi</p>
            <p>Machine Learning</p>
            <br />
            <p className='font-bold'>Call Me</p>
            <p>06 51 45 83 25</p>
            <br />
            <p className='font-bold'>Message Me</p>
            <p>mateo.hamaimi@efrei.net</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;

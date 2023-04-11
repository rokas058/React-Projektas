import React from 'react';
import paveikslaiCover from '../pages/images/keramika-cover.jpg';

function Keramika() {
  return (
    <div className="cover">
      <img src={paveikslaiCover} alt="Paveikslai" />
      <h1>Keramika</h1>
    </div>
  )
}

export default Keramika
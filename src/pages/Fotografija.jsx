import React from 'react';
import paveikslaiCover from '../pages/images/fotografija-cover.jpg';


function Fotografija() {
  return (
    <div className="cover">
        <img src={paveikslaiCover} alt="Paveikslai" />
        <h1>Fotografija</h1>
      </div>
  )
}

export default Fotografija
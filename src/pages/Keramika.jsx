import React, { useEffect } from 'react';
import paveikslaiCover from '../pages/images/keramika-cover.jpg';

function checkAccessTokenDeletion() {
  const accessTokenKey = 'accessToken'; // Replace this with the key you use to store the access token

  const accessToken = localStorage.getItem(accessTokenKey);

  if (accessToken === null) {
    console.log('Access token has been deleted from the browser.');
  } else {
    console.log('Access token is still present in the browser.');
  }
}

function Keramika() {
  useEffect(() => {
    checkAccessTokenDeletion();
  }, []);

  return (
    <div className="cover">
      <img src={paveikslaiCover} alt="Paveikslai" />
      <h1>Keramika</h1>
    </div>
  );
}

export default Keramika;

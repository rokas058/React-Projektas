import React from 'react';
import CategoryPage from './CategoryPage';
import keramikaCover from './images/keramika-cover.jpg';

const Keramika = () => {
  return (
    <CategoryPage
      category="Keramika"
      coverImage={keramikaCover}
      apiUrl="http://localhost:8080/keramika"
    />
  );
};

export default Keramika;

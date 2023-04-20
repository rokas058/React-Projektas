import React from 'react';
import CategoryPage from './CategoryPage';
import paveikslaiCover from './images/paveikslai-cover.jpg';

const Paveikslai = () => {
  return (
    <CategoryPage
      category="Paveikslai"
      coverImage={paveikslaiCover}
      apiUrl="http://localhost:8080/paveikslai"
    />
  );
};

export default Paveikslai;

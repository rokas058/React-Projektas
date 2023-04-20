import React from 'react';
import CategoryPage from './CategoryPage';
import fotografijaCover from './images/fotografija-cover.jpg';

const Fotografija = () => {
  return (
    <CategoryPage
      category="Fotografija"
      coverImage={fotografijaCover}
      apiUrl="http://localhost:8080/fotografijos"
    />
  );
};

export default Fotografija;

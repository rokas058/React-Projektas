import React from 'react';
import CategoryPage from './CategoryPage';
import skulpturosCover from './images/skulpturos-cover.jpg';

const Skulpturos = () => {
  return (
    <CategoryPage
      category="Skulptūros"
      coverImage={skulpturosCover}
      apiUrl="http://localhost:8080/skulpturos"
    />
  );
};

export default Skulpturos;

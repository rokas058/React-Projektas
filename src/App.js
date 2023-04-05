import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Paveikslai from './pages/Paveikslai';
import Fotografija from './pages/Fotografija';
import Skulpturos from './pages/Skulpturos';
import Keramika from './pages/Keramika';


function App() {
  return (
    <div>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/paveikslai" element={<Paveikslai />} />
        <Route path="/fotografija" element={<Fotografija />} />
        <Route path="/skulpturos" element={<Skulpturos />} />
        <Route path="/keramika" element={<Keramika />} />
      </Routes>
      </div>
  );
}

export default App;


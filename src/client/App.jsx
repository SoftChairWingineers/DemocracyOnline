import React from 'react';
import { Routes, Route } from 'react-router';

import Home from './views/Home';
import Dashboard from './views/Dashboard';
import PoliticalPhilosophy from './views/PoliticalPhilosophy';
import Debates from './views/Debates';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='politicalPhilosophy' element={<PoliticalPhilosophy/>} />
      <Route path="/Debates/*" element={<Debates></Debates>}/>
    </Routes>
  )
}

export default App;

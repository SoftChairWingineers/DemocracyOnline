import React from 'react';
import { Routes, Route } from 'react-router';

import Home from './views/Home';
import Dashboard from './views/Dashboard';
import PoliticalPhilosophy from './views/PoliticalPhilosophy';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='politicalPhilosophy' element={<PoliticalPhilosophy/>} />
    </Routes>
  )
}

export default App;

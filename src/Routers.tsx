import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import CountriesPage from './pages/Countries';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="main" element={<App />} />
        <Route path="*" element={<CountriesPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;

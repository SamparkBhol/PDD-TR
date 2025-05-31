import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import DiagnosisReportPage from '@/pages/DiagnosisReportPage';
import AboutPage from '@/pages/AboutPage';
import ProductPage from '@/pages/ProductPage';
import SavedReportsPage from '@/pages/SavedReportsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reports" element={<SavedReportsPage />} />
          <Route path="/report/:id" element={<DiagnosisReportPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </Router>
  );
}

export default App;
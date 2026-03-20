import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLenisScroll } from './hooks/useLenisScroll';

// Layout
import Navbar from './navigation/Navbar';
import Footer from './layout/Footer';
import PageLayout from './layout/PageLayout';
import CustomCursor from './components/ui/CustomCursor';
import ScrollToTop from './components/ui/ScrollToTop';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import ProjectDetail from './pages/ProjectDetail';

// No mock pages anymore



function App() {
  useLenisScroll();

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-background font-sans">
        <CustomCursor />
        <Navbar />

        <main>
          <PageLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
            </Routes>
          </PageLayout>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;

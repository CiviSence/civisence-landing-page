import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import DashboardPreview from './components/DashboardPreview';
import Categories from './components/Categories';
import Benefits from './components/Benefits';
import Analytics from './components/Analytics';
import Tracking from './components/Tracking';
import Comparison from './components/Comparison';
import Testimonials from './components/Testimonials';
import Organizations from './components/Organizations';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import DownloadApp from './components/DownloadApp';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <DownloadApp />
      <About />
      <HowItWorks />
      <Features />
      <DashboardPreview />
      <Categories />
      <Benefits />
      <Analytics />
      <Tracking />
      <Comparison />
      <Testimonials />
      <Organizations />
      <FAQ />
      <Contact />
      
      <CTA />
      <Footer />
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionStats from './components/SectionStats';
import SectionManifesto from './components/SectionManifesto';
import SectionServices from './components/SectionServices';
import SectionMarketData from './components/SectionMarketData';
import SectionProcess from './components/SectionProcess';
import SectionStory from './components/SectionStory';
import SectionClients from './components/SectionClients';
import SectionResources from './components/SectionResources';
import SectionContact from './components/SectionContact';
import SectionFAQ from './components/SectionFAQ';
import Footer from './components/Footer';
import DesignAssistant from './components/DesignAssistant';
import Dashboard from './components/Dashboard';
import LiveTicker from './components/LiveTicker';

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  if (isAdminOpen) {
    return <Dashboard onBack={() => setIsAdminOpen(false)} />;
  }

  const handleNavigate = (sectionId: string) => {
    // If navigating to home, scroll to top
    if (sectionId === 'home') {
       window.scrollTo({ top: 0, behavior: 'smooth' });
       return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for navbar height + ticker
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="font-sans text-stone-900 bg-stone-50 antialiased overflow-x-hidden selection:bg-stone-200">
      <Navbar onNavigate={handleNavigate} />
      <main>
        <LiveTicker />
        
        <div id="home">
          <Hero />
        </div>
        
        <div id="about">
          <SectionStats />
          <SectionStory />
          <SectionManifesto />
        </div>

        <div id="service">
          <SectionServices compact={false} />
          <SectionProcess />
          <SectionMarketData />
          <SectionResources />
        </div>

        <SectionClients />

        <div id="contact">
          <SectionFAQ />
          <SectionContact />
        </div>
      </main>
      <Footer onAdminClick={() => setIsAdminOpen(true)} />
      <DesignAssistant />
    </div>
  );
};

export default App;
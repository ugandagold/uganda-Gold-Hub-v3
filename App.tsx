import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PageHeader from './components/PageHeader';
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

type ViewState = 'home' | 'about' | 'service' | 'contact' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  if (currentView === 'dashboard') {
    return <Dashboard onBack={() => setCurrentView('home')} />;
  }

  const handleNavigate = (page: string) => {
    setCurrentView(page as ViewState);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return (
          <>
            <Hero />
            <SectionStats />
            <SectionStory />
            <SectionMarketData />
            <SectionServices compact={true} onNavigate={handleNavigate} />
            <SectionManifesto />
            <SectionProcess />
            <SectionResources />
            <SectionClients />
            <SectionFAQ />
            <SectionContact />
          </>
        );
      
      case 'about':
        return (
          <>
            <PageHeader 
              title="Who We Are" 
              subtitle="Legacy & Integrity"
              image="https://github.com/ugandagold/ugandagoldhubpics/blob/main/Generated%20image%201%20(1).png?raw=true" 
            />
            <SectionStats />
            <SectionStory />
            <SectionManifesto />
            <SectionClients />
          </>
        );

      case 'service':
        return (
          <>
             <PageHeader 
              title="Our Expertise" 
              subtitle="Technical & Logistics"
              image="https://github.com/ugandagold/ugandagoldhubpics/blob/main/Generated%20image%201%20(2).png?raw=true" 
            />
            <SectionServices compact={false} />
            <SectionProcess />
            <SectionMarketData />
            <SectionResources />
          </>
        );

      case 'contact':
        return (
          <>
             <PageHeader 
              title="Contact Us" 
              subtitle="Get In Touch"
              image="https://github.com/ugandagold/ugandagoldhubpics/blob/main/Generated%20image%201%20(6).png?raw=true" 
            />
            <SectionContact />
            <SectionFAQ />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="font-sans text-stone-900 bg-stone-50 antialiased overflow-x-hidden selection:bg-stone-200">
      <Navbar onNavigate={handleNavigate} currentPage={currentView} />
      <main>
        <LiveTicker />
        {renderContent()}
      </main>
      <Footer onAdminClick={() => setCurrentView('dashboard')} />
      <DesignAssistant />
    </div>
  );
};

export default App;
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PageHeader from './components/PageHeader';
import SectionStats from './components/SectionStats';
import SectionManifesto from './components/SectionManifesto';
import SectionServices from './components/SectionServices';
import SectionMarketData from './components/SectionMarketData';
import SectionProcess from './components/SectionProcess';
import SectionProjects from './components/SectionProjects';
import SectionStory from './components/SectionStory';
import SectionClients from './components/SectionClients';
import SectionResources from './components/SectionResources';
import SectionBlog from './components/SectionBlog';
import SectionContact from './components/SectionContact';
import SectionFAQ from './components/SectionFAQ';
import Footer from './components/Footer';
import DesignAssistant from './components/DesignAssistant';
import Dashboard from './components/Dashboard';
import LiveTicker from './components/LiveTicker';

type ViewState = 'home' | 'about' | 'service' | 'projects' | 'blog' | 'contact' | 'dashboard';

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
            <SectionProjects />
            <SectionResources />
            <SectionClients />
            <SectionFAQ />
            <SectionBlog />
            <SectionContact />
          </>
        );
      
      case 'about':
        return (
          <>
            <PageHeader 
              title="Who We Are" 
              subtitle="Legacy & Integrity"
              image="https://images.unsplash.com/photo-1518709766631-a6a7f45921c3?q=80&w=2000&auto=format&fit=crop" 
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
              image="https://images.unsplash.com/photo-1639411677420-b903ce0920c4?q=80&w=2000&auto=format&fit=crop" 
            />
            <SectionServices compact={false} />
            <SectionProcess />
            <SectionMarketData />
            <SectionResources />
          </>
        );

      case 'projects':
        return (
          <>
             <PageHeader 
              title="Global Operations" 
              subtitle="Case Studies"
              image="https://images.unsplash.com/photo-1578326457399-3b34dbbf23b8?q=80&w=2000&auto=format&fit=crop" 
            />
            <SectionProjects />
            <SectionClients />
          </>
        );

      case 'blog':
        return (
          <>
             <PageHeader 
              title="Market Insights" 
              subtitle="News & Updates"
              image="https://images.unsplash.com/photo-1601121853354-e6e866bd2bac?q=80&w=2000&auto=format&fit=crop" 
            />
            <SectionBlog />
          </>
        );

      case 'contact':
        return (
          <>
             <PageHeader 
              title="Contact Us" 
              subtitle="Get In Touch"
              image="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop" 
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
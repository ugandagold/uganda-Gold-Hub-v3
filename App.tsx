import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SectionStats from './components/SectionStats';
import SectionManifesto from './components/SectionManifesto';
import SectionServices from './components/SectionServices';
import SectionProjects from './components/SectionProjects';
import SectionStory from './components/SectionStory';
import SectionTeam from './components/SectionTeam';
import SectionClients from './components/SectionClients';
import SectionBlog from './components/SectionBlog';
import SectionContact from './components/SectionContact';
import SectionFAQ from './components/SectionFAQ';
import Footer from './components/Footer';
import DesignAssistant from './components/DesignAssistant';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard'>('home');

  if (currentView === 'dashboard') {
    return <Dashboard onBack={() => setCurrentView('home')} />;
  }

  return (
    <div className="font-sans text-stone-900 bg-stone-50 antialiased overflow-x-hidden selection:bg-stone-200">
      <Navbar />
      <main>
        <Hero />
        <SectionStats />
        <SectionServices />
        <SectionManifesto />
        <SectionProjects />
        <SectionStory />
        <SectionTeam />
        <SectionClients />
        <SectionBlog />
        <SectionContact />
        <SectionFAQ />
      </main>
      <Footer onAdminClick={() => setCurrentView('dashboard')} />
      <DesignAssistant />
    </div>
  );
};

export default App;
import React, { Suspense } from 'react';
import HeroSection from './components/Hero/HeroSection';
import MissionStats from './components/Stats/MissionStats';
import MissionProfile from './components/MissionControl/MissionProfile';
import CTA from './components/CTA/CTA';
import LaunchSchedule from './components/Schedule/LaunchSchedule';
import Mission01Header from './components/Mission01/Mission01Header';
import TelemetryDashboard from './components/Dashboard/TelemetryDashboard';
import { Sustainability, OrbitalAI } from './components/Sections/InfoSections';

function App() {
  return (
    <div className="bg-dark min-h-screen text-white font-sans selection:bg-neon selection:text-black">
      <HeroSection />

      <MissionStats />

      {/* 2.0 Feature: Upcoming Schedule (Replaces Configurator) */}
      <LaunchSchedule />

      {/* --- MISSION 01 SECTION --- */}
      {/* 1. Header (Video + Objectives) */}
      <Mission01Header />

      {/* 2. Simulation (Scrollytelling) */}
      <MissionProfile />

      {/* 3. Data Dashboard */}
      <TelemetryDashboard />
      {/* ------------------------- */}

      <Sustainability />
      <OrbitalAI />

      <CTA />

      <footer className="py-6 text-center text-xs text-gray-600 border-t border-white/5 bg-black">
        &copy; {new Date().getFullYear()} Agnikul Cosmos. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;

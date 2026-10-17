import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar } from './components/BottomNavBar';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { SearchModal } from './components/SearchModal';
import { InspectorModal, InspectorContent } from './components/InspectorModal';
import { Toast } from './components/Toast';
import { ContactModal } from './components/ContactModal';
import { SpatialJournalSidebar } from './components/SpatialJournalSidebar';

// Views
import { DiscoverView } from './views/DiscoverView';
import { DashboardView } from './views/DashboardView';
import { TriageView } from './views/TriageView';
import { RisksView } from './views/RisksView';
import { RoadmapView } from './views/RoadmapView';
import { CompetitorMatrixView } from './views/CompetitorMatrixView';
import { DependencyGraphView } from './views/DependencyGraphView';
import { TraceabilityView } from './views/TraceabilityView';
import { RubricView } from './views/RubricView';
import { FolioDirectoryView } from './views/FolioDirectoryView';
import { AuthView } from './views/AuthView';
import { OnboardingView } from './views/OnboardingView';
import { CuratorProfileView } from './views/CuratorProfileView';
import { SpatialStudio3DView } from './views/SpatialStudio3DView';
import { useFirebase } from './firebase/context';

import { AppScreen, BottomTab, FolioItem } from './types';
import { FOLIOS_DATA } from './data/mockData';

export default function App() {
  const { user, isConnected } = useFirebase();
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('discover');
  const [activeTab, setActiveTab] = useState<BottomTab>('discover');
  const [activeFolio, setActiveFolio] = useState<FolioItem>(FOLIOS_DATA[0]);

  // Modals & Panels
  const [isScreenSwitcherOpen, setIsScreenSwitcherOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [inspectorContent, setInspectorContent] = useState<InspectorContent | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  const handleNavigate = (screen: AppScreen) => {
    setCurrentScreen(screen);
    // Sync bottom navigation tab
    if (screen === 'discover' || screen === 'folios') {
      setActiveTab('discover');
    } else if (
      screen === 'dashboard' ||
      screen === 'triage' ||
      screen === 'risks' ||
      screen === 'competitors' ||
      screen === 'dependencies' ||
      screen === 'dependency-intel'
    ) {
      setActiveTab('investigations');
    } else if (screen === 'roadmap' || screen === 'traceability' || screen === 'spatial-studio') {
      setActiveTab('3d-core');
    } else if (screen === 'rubric' || screen === 'profile') {
      setActiveTab('passport');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: BottomTab) => {
    setActiveTab(tab);
    if (tab === 'discover') {
      setCurrentScreen('discover');
    } else if (tab === 'investigations') {
      setCurrentScreen('dashboard');
    } else if (tab === '3d-core') {
      setCurrentScreen('spatial-studio');
    } else if (tab === 'passport') {
      setCurrentScreen('rubric');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInspector = (content: InspectorContent) => {
    setInspectorContent(content);
    setIsInspectorOpen(true);
  };

  const handleInspectorAttach = async (annotation: string) => {
    showToast(
      annotation
        ? `Annotation attached to ${activeFolio.title} & synced to Firestore`
        : `Artifact attached to ${activeFolio.title}`
    );
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f4be65', '#d6a34d', '#bfcbac']
    });

    try {
      const { createAnnotation } = await import('./firebase/db');
      await createAnnotation({
        id: `ann_${Date.now()}`,
        authorId: user?.uid || 'curator_session',
        folioId: activeFolio.id,
        title: inspectorContent?.title || 'Inspection Observation',
        text: annotation || inspectorContent?.description || 'Curator telemetry note',
        category: inspectorContent?.category || 'General',
        metric: inspectorContent?.metric,
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      console.warn('Annotation save notice:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#121318] text-[#e3e2e8] flex flex-col justify-between selection:bg-[#d6a34d] selection:text-[#573a00]">
      {/* Top Application Bar */}
      <TopAppBar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenFolios={() => handleNavigate('folios')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenScreenSwitcher={() => setIsScreenSwitcherOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        activeFolioTitle={activeFolio.title}
        hardBlockerCount={1}
        userDisplayName={user?.displayName || undefined}
        userPhotoUrl={user?.photoURL || undefined}
      />

      {/* Screen Render Router */}
      <div className="flex-1">
        {currentScreen === 'discover' && (
          <DiscoverView
            onNavigate={handleNavigate}
            onOpenInspector={handleOpenInspector}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'triage' && (
          <TriageView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'risks' && (
          <RisksView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'roadmap' && (
          <RoadmapView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'competitors' && (
          <CompetitorMatrixView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'dependencies' && (
          <DependencyGraphView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'dependency-intel' && (
          <DependencyGraphView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'traceability' && (
          <TraceabilityView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'rubric' && (
          <RubricView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'folios' && (
          <FolioDirectoryView
            onNavigate={handleNavigate}
            onSelectFolio={(folio) => setActiveFolio(folio)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthView onNavigate={handleNavigate} onShowToast={showToast} initialMode="signin" />
        )}

        {currentScreen === 'register' && (
          <AuthView onNavigate={handleNavigate} onShowToast={showToast} initialMode="register" />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'profile' && (
          <CuratorProfileView onNavigate={handleNavigate} onShowToast={showToast} />
        )}

        {currentScreen === 'spatial-studio' && (
          <SpatialStudio3DView onNavigate={handleNavigate} onShowToast={showToast} />
        )}
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Universal Modals & Drawers */}
      <ScreenSwitcher
        isOpen={isScreenSwitcherOpen}
        onClose={() => setIsScreenSwitcherOpen(false)}
        currentScreen={currentScreen}
        onSelectScreen={handleNavigate}
        onOpenContact={() => setIsContactOpen(true)}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <InspectorModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        content={inspectorContent}
        onAttach={handleInspectorAttach}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        onShowToast={showToast}
        activeFolio={activeFolio.title}
      />

      {/* Live Toast Banner */}
      <Toast message={toastMessage} onClear={() => setToastMessage(null)} />
    </div>
  );
}

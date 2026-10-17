import React from 'react';
import { AppScreen } from '../types';

interface TopAppBarProps {
  currentScreen: AppScreen;
  onNavigate: (screen: AppScreen) => void;
  onOpenFolios: () => void;
  onOpenSearch: () => void;
  onOpenScreenSwitcher: () => void;
  onOpenContact: () => void;
  onOpenJournal: () => void;
  activeFolioTitle?: string;
  hardBlockerCount?: number;
  userDisplayName?: string;
  userPhotoUrl?: string;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentScreen,
  onNavigate,
  onOpenFolios,
  onOpenSearch,
  onOpenScreenSwitcher,
  onOpenContact,
  onOpenJournal,
  activeFolioTitle = 'Drone Seedling v2.4',
  hardBlockerCount = 1,
  userDisplayName,
  userPhotoUrl
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-3 sm:px-6 md:px-8 py-2.5 bg-[#1a1b20]/95 backdrop-blur-md shadow-sm border-b border-[#4f4537]/40 transition-all duration-200">
      {/* Brand / Leading */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={() => onNavigate('discover')}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1f24] border border-[#4f4537]/40 text-[#f4be65] hover:text-[#ffdead] hover:border-[#f4be65]/60 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
          title="Explore Focus"
        >
          <span className="material-symbols-outlined text-[19px]">explore</span>
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onNavigate('discover')}
              className="font-headline-sm text-[16px] sm:text-[18px] text-[#f4be65] tracking-tight text-left cursor-pointer hover:opacity-90 transition-opacity"
            >
              BuildScope AI
            </button>
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-label-spatial uppercase tracking-widest bg-[#d6a34d]/20 text-[#f4be65] border border-[#f4be65]/30">
              v2.4
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenFolios}
            className="flex items-center gap-1 text-[11px] text-[#d3c4b2] font-label-spatial truncate max-w-[190px] sm:max-w-[260px] text-left hover:text-[#f4be65] transition-colors cursor-pointer"
            title="Switch Project Folio"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac] animate-pulse inline-block" />
            <span className="truncate">{activeFolioTitle}</span>
            <span className="material-symbols-outlined text-[12px] text-[#9c8f7e]">unfold_more</span>
          </button>
        </div>
      </div>

      {/* Trailing Actions */}
      <div className="flex items-center gap-1.5 sm:gap-2.5">
        {/* Spatial Journal Activity Feed */}
        <button
          type="button"
          onClick={onOpenJournal}
          className="btn-tactile-dark px-2 sm:px-2.5 py-1 rounded text-[11px] font-label-spatial flex items-center gap-1 sm:gap-1.5 cursor-pointer relative"
          title="Open Real-time Spatial Activity Journal & Telemetry Feed"
        >
          <span className="material-symbols-outlined text-[15px] sm:text-[14px] text-[#f4be65]">history_edu</span>
          <span className="hidden md:inline">Journal</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac] animate-pulse inline-block" />
        </button>

        {/* Contact Curator */}
        <button
          type="button"
          onClick={onOpenContact}
          className="btn-tactile-dark px-2 sm:px-2.5 py-1 rounded text-[11px] font-label-spatial flex items-center gap-1 sm:gap-1.5 cursor-pointer"
          title="Contact Atelier Lead Curator"
        >
          <span className="material-symbols-outlined text-[15px] sm:text-[14px] text-[#f4be65]">mail</span>
          <span className="hidden sm:inline">Contact</span>
        </button>

        {/* 15 Screens Navigator Button */}
        <button
          type="button"
          onClick={onOpenScreenSwitcher}
          className="px-2.5 py-1 rounded bg-[#1e1f24] border border-[#4f4537]/60 hover:border-[#f4be65]/80 hover:bg-[#292a2f] text-[#f4be65] text-[11px] font-label-spatial flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          title="All 15 Authentic Screens Navigator"
        >
          <span className="material-symbols-outlined text-[14px]">grid_view</span>
          <span className="hidden xs:inline">15 Screens</span>
        </button>

        {/* Hard Blocker Alert Indicator */}
        {hardBlockerCount > 0 && (
          <button
            type="button"
            onClick={() => onNavigate('triage')}
            className="flex items-center gap-1 px-2 py-1 rounded bg-[#93000a]/25 border border-[#ffb4ab]/40 text-[#ffb4ab] text-[10px] font-label-spatial font-bold animate-pulse hover:bg-[#93000a]/40 transition-colors cursor-pointer"
            title="1 Hard Blocker: 3.2 MPa Solenoid (Click to Triage)"
          >
            <span className="material-symbols-outlined text-[13px]">warning</span>
            <span className="hidden sm:inline">1 Blocked</span>
          </button>
        )}

        {/* Search */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center justify-center w-8 h-8 rounded text-[#d3c4b2] hover:text-[#f4be65] hover:bg-[#1e1f24] transition-all duration-150 active:scale-95 cursor-pointer"
          title="Search"
        >
          <span className="material-symbols-outlined text-[19px]">search</span>
        </button>

        {/* User Profile / Monogram */}
        <button
          type="button"
          onClick={() => onNavigate('profile')}
          className="w-7 h-7 rounded-full bg-[#504836] border border-[#f4be65]/40 flex items-center justify-center text-[#f4be65] font-label-tag text-[11px] font-bold shadow-inner cursor-pointer hover:border-[#f4be65] hover:scale-105 active:scale-95 transition-all overflow-hidden"
          title={userDisplayName ? `Curator: ${userDisplayName}` : 'Curator Profile & Security Settings'}
        >
          {userPhotoUrl ? (
            <img src={userPhotoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : userDisplayName ? (
            userDisplayName.substring(0, 2).toUpperCase()
          ) : (
            'AV'
          )}
        </button>
      </div>
    </header>
  );
};

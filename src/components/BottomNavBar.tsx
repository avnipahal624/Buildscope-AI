import React from 'react';
import { BottomTab } from '../types';

interface BottomNavBarProps {
  activeTab: BottomTab;
  onTabChange: (tab: BottomTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2 pb-safe bg-[#0d0e13]/95 backdrop-blur-md shadow-lg border-t border-[#4f4537]/30"
    >
      {/* Tab 1: Discover */}
      <button
        type="button"
        onClick={() => onTabChange('discover')}
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-95 cursor-pointer ${
          activeTab === 'discover'
            ? 'text-[#f4be65] font-semibold'
            : 'text-[#d3c4b2] hover:text-[#f4bd65]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[21px] ${
            activeTab === 'discover' ? 'fill-icon' : ''
          }`}
        >
          travel_explore
        </span>
        <span className="text-[10px] font-label-tag tracking-wide">Discover</span>
      </button>

      {/* Tab 2: Investigations */}
      <button
        type="button"
        onClick={() => onTabChange('investigations')}
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-95 cursor-pointer relative ${
          activeTab === 'investigations'
            ? 'text-[#f4be65] font-semibold'
            : 'text-[#d3c4b2] hover:text-[#f4bd65]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[21px] ${
            activeTab === 'investigations' ? 'fill-icon' : ''
          }`}
        >
          architecture
        </span>
        <span className="text-[10px] font-label-tag tracking-wide">Investigations</span>
        {activeTab === 'investigations' && (
          <span className="absolute -top-1 right-2 w-1.5 h-1.5 rounded-full bg-[#f4be65] animate-ping" />
        )}
      </button>

      {/* Tab 3: 3D Core */}
      <button
        type="button"
        onClick={() => onTabChange('3d-core')}
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-95 cursor-pointer ${
          activeTab === '3d-core'
            ? 'text-[#f4be65] font-semibold'
            : 'text-[#d3c4b2] hover:text-[#f4bd65]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[21px] ${
            activeTab === '3d-core' ? 'fill-icon' : ''
          }`}
        >
          deployed_code
        </span>
        <span className="text-[10px] font-label-tag tracking-wide">3D Core</span>
      </button>

      {/* Tab 4: Passport */}
      <button
        type="button"
        onClick={() => onTabChange('passport')}
        className={`flex flex-col items-center justify-center gap-1 transition-all duration-150 active:scale-95 cursor-pointer ${
          activeTab === 'passport'
            ? 'text-[#f4be65] font-semibold'
            : 'text-[#d3c4b2] hover:text-[#f4bd65]'
        }`}
      >
        <span
          className={`material-symbols-outlined text-[21px] ${
            activeTab === 'passport' ? 'fill-icon' : ''
          }`}
        >
          verified_user
        </span>
        <span className="text-[10px] font-label-tag tracking-wide">Passport</span>
      </button>
    </nav>
  );
};

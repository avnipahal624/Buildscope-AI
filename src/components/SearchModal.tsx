import React, { useState } from 'react';
import { AppScreen } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: AppScreen) => void;
}

interface SearchResult {
  id: string;
  title: string;
  category: string;
  meta: string;
  targetScreen: AppScreen;
  badge: string;
}

const SEARCH_DATABASE: SearchResult[] = [
  {
    id: 's-1',
    title: 'Autonomous Canopy LiDAR Mapping (arXiv:2403.0112)',
    category: 'Research Paper',
    meta: 'Botanical tree trunk classification using edge flight computer',
    targetScreen: 'discover',
    badge: '96% Feasibility'
  },
  {
    id: 's-2',
    title: '3.2 MPa Dart Solenoid cyclic fatigue deficit (-20.0%)',
    category: 'Hazard / Gate',
    meta: 'DARPA STTR §4.2 critical deficit in cryogenic low-pressure chamber',
    targetScreen: 'triage',
    badge: 'Hard Blocker'
  },
  {
    id: 's-3',
    title: 'Protocol B-2 Dual-Burrow Micro-Auger Pre-Drill',
    category: 'Contingency / Fallback',
    meta: '12,000 RPM titanium planetary auger alternative to pneumatic driver',
    targetScreen: 'dashboard',
    badge: 'Armed & Ready'
  },
  {
    id: 's-4',
    title: 'Climate AI Innovation Track 2024-2025 Rubric',
    category: 'Competition',
    meta: 'Global Autonomous Systems & Forestry Consortium 28/30 points',
    targetScreen: 'rubric',
    badge: 'Tier 1 Finalist'
  },
  {
    id: 's-5',
    title: 'Jetson Orin Nano (8GB Unified LPDDR5) 42 FPS',
    category: 'Hardware Specs',
    meta: 'TensorRT FP16, 23ms latency, 5.1W draw under canopy downwash',
    targetScreen: 'dependencies',
    badge: 'Verified'
  },
  {
    id: 's-6',
    title: 'Competitor Overlap Matrix: TerraDrone Agri-X vs BioSeed',
    category: 'Competitor Intelligence',
    meta: 'Botanical SLAM Moat vs closed cellular SDKs',
    targetScreen: 'competitors',
    badge: '92% Moat'
  },
  {
    id: 's-7',
    title: 'OpenStreetMap Hydro Topo Catchment Geometries',
    category: 'Dataset',
    meta: '1.8 GB GeoJSON vector dataset for Pacific Northwest runoff risk',
    targetScreen: 'discover',
    badge: 'ODbL 1.0'
  },
  {
    id: 's-8',
    title: 'ROS2 Iron Botanical SLAM Pipeline Integration',
    category: 'Roadmap Milestone',
    meta: 'Task #104 Odometry core with real-time foliage density filtering',
    targetScreen: 'roadmap',
    badge: 'Verified'
  }
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = SEARCH_DATABASE.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.meta.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-16 px-3 sm:px-5"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1b20] border border-[#f4be65]/40 rounded-xl w-full max-w-lg shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 border-b border-[#4f4537]/30 flex items-center gap-2.5 bg-[#1e1f24]">
          <span className="material-symbols-outlined text-[#f4be65] text-[20px]">search</span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ideas, research, hardware specs, datasets..."
            className="w-full bg-transparent text-xs text-[#e3e2e8] placeholder:text-[#9c8f7e] focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-[#9c8f7e] hover:text-[#e3e2e8] p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Results Stream */}
        <div className="max-h-[60vh] overflow-y-auto no-scrollbar p-3 space-y-2">
          {results.length > 0 ? (
            results.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onNavigate(item.targetScreen);
                  onClose();
                }}
                className="p-2.5 rounded-lg bg-[#1e1f24] hover:bg-[#292a2f] border border-[#4f4537]/30 hover:border-[#f4be65]/50 transition-colors cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[10px] font-label-spatial mb-1">
                  <span className="text-[#f4be65]">{item.category}</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#0d0e13] text-[#bfcbac] border border-[#bfcbac]/30">
                    {item.badge}
                  </span>
                </div>
                <h4 className="font-headline-sm text-xs text-[#e3e2e8] group-hover:text-[#f4be65] transition-colors leading-snug">
                  {item.title}
                </h4>
                <p className="text-[11px] text-[#d3c4b2] mt-0.5 line-clamp-1">{item.meta}</p>
              </div>
            ))
          ) : (
            <div className="py-8 text-center text-xs text-[#9c8f7e]">
              No matching intelligence artifacts found for "{query}".
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-[#4f4537]/30 bg-[#0d0e13] flex items-center justify-between text-[11px] font-label-spatial text-[#9c8f7e]">
          <span>BuildScope AI Global Index</span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
};

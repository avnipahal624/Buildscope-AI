import React from 'react';
import { AppScreen } from '../types';

interface ScreenSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentScreen: AppScreen;
  onSelectScreen: (screen: AppScreen) => void;
  onOpenContact?: () => void;
}

interface ScreenInfo {
  id: AppScreen;
  title: string;
  category: string;
  icon: string;
  badge?: string;
  description: string;
}

const ALL_SCREENS: ScreenInfo[] = [
  {
    id: 'discover',
    title: '1. Spatial Discovery Feed & 3D Core',
    category: 'Discover',
    icon: 'travel_explore',
    badge: 'Main',
    description: 'Armillary sphere, Pinterest research masonry feed, and Buildability Passport'
  },
  {
    id: 'dashboard',
    title: '2. Project Intelligence Dashboard',
    category: 'Investigations',
    icon: 'dashboard',
    badge: 'Executive',
    description: 'Boreal-Dart drone specimen, 6-dimension readiness matrix & next actions'
  },
  {
    id: 'triage',
    title: '3. Executive Triage & Gatekeeper',
    category: 'Investigations',
    icon: 'stacks',
    badge: '1 Blocker',
    description: 'DARPA §4.2 deficit, Triage carousel, and live cryptographic audit trail'
  },
  {
    id: 'risks',
    title: '4. Risk Register & Fallback Matrix',
    category: 'Investigations',
    icon: 'shield_with_heart',
    badge: 'TRL-6',
    description: 'Threat posture, GNSS blindout, bounce, heat throttling, FMEA export'
  },
  {
    id: 'roadmap',
    title: '5. Build Plan & Roadmap',
    category: '3D Core',
    icon: 'event_note',
    badge: 'Sprint 02',
    description: 'Substrate impact, Tasks #104-#107, pneumatic dart calibration'
  },
  {
    id: 'competitors',
    title: '6. Competitor Overlap Matrix',
    category: 'Investigations',
    icon: 'difference',
    badge: '92% Moat',
    description: 'TerraDrone & BioSeed analysis, differentiation hypothesis, citations'
  },
  {
    id: 'dependencies',
    title: '7. Technical Feasibility & Dependencies',
    category: 'Investigations',
    icon: 'hub',
    badge: '12 Nodes',
    description: '12 pinned nodes, Orin Nano, MAVLink, Solenoid hard gate alert'
  },
  {
    id: 'dependency-intel',
    title: '8. Dependency Intelligence Workspace',
    category: 'Investigations',
    icon: 'account_tree',
    badge: 'PROD-C',
    description: 'Topology, ledger, root cause deficit breakdown, Protocol B-2 switch'
  },
  {
    id: 'traceability',
    title: '9. Traceability & Causal Flow Navigator',
    category: '3D Core',
    icon: 'insights',
    badge: 'Chain #TK-98',
    description: 'Interactive SVG pulse-flow causal nodes, contradiction alerts & inspector'
  },
  {
    id: 'rubric',
    title: '10. Competition Rubric & Acceptance',
    category: 'Passport',
    icon: 'military_tech',
    badge: '28/30 Pts',
    description: 'Climate AI Innovation Track decree, criteria 01-04 evidence mapping'
  },
  {
    id: 'folios',
    title: '11. Project Folios & Repositories',
    category: 'Discover',
    icon: 'folder_open',
    badge: '12 Folios',
    description: 'Dossier directory with Active, Experimental, and Archived projects'
  },
  {
    id: 'auth',
    title: '12. Authentication Portal',
    category: 'Security',
    icon: 'lock',
    badge: 'Auth',
    description: 'Studio Access Protocol, institutional sign-in, Google Workspace SSO'
  },
  {
    id: 'register',
    title: '13. Folio Registration & Sign Up',
    category: 'Security',
    icon: 'how_to_reg',
    badge: '84-bit Entropy',
    description: 'Master keyphrase entropy meter, Ed25519 ID, client-side WASM moat'
  },
  {
    id: 'onboarding',
    title: '14. Academic & Builder Dossier',
    category: 'Onboarding',
    icon: 'history_edu',
    badge: 'Step 1/6',
    description: 'Parchment sheet with Stanford registry, degree pills, interest vectors'
  },
  {
    id: 'profile',
    title: '15. Curator Profile & Security Settings',
    category: 'Passport',
    icon: 'person',
    badge: 'AV Seal',
    description: 'Dr. Aris Vandenberg, Ed25519 keypair, routing defaults, storage quota'
  },
  {
    id: 'spatial-studio',
    title: '16. Three.js 3D Spatial Scene Studio',
    category: '3D Core',
    icon: 'deployed_code',
    badge: 'Three.js PBR',
    description: 'Boreal-Dart v2.4 procedural drone, exploded separation, B-2 auger & PBR lighting'
  }
];

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({
  isOpen,
  onClose,
  currentScreen,
  onSelectScreen,
  onOpenContact
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        className="bg-[#1a1b20] border border-[#f4be65]/40 rounded-xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#4f4537]/40 bg-[#1e1f24]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f4be65] text-[22px]">
              apps
            </span>
            <div>
              <h2 className="font-headline-sm text-lg text-[#e3e2e8]">
                All 15 BuildScope Screens
              </h2>
              <p className="text-xs text-[#d3c4b2] font-label-spatial">
                Select any view to examine its authentic editorial design & layout
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded bg-[#121318] text-[#9c8f7e] hover:text-[#e3e2e8] flex items-center justify-center cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Screens Grid */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-2">
          {ALL_SCREENS.map((screen) => {
            const isSelected = currentScreen === screen.id;
            return (
              <button
                key={screen.id}
                type="button"
                onClick={() => {
                  onSelectScreen(screen.id);
                  onClose();
                }}
                className={`w-full p-3 rounded-lg border text-left transition-all flex items-start gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#292a2f] border-[#f4be65] ring-1 ring-[#f4be65]/50'
                    : 'bg-[#1e1f24] border-[#4f4537]/30 hover:border-[#f4be65]/40 hover:bg-[#292a2f]/50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded flex items-center justify-center shrink-0 ${
                    isSelected
                      ? 'bg-[#d6a34d] text-[#281900]'
                      : 'bg-[#121318] text-[#f4be65] border border-[#4f4537]/40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {screen.icon}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-headline-sm text-[14px] text-[#e3e2e8] truncate">
                      {screen.title}
                    </h3>
                    {screen.badge && (
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-label-spatial bg-[#d6a34d]/20 text-[#f4be65] border border-[#d6a34d]/40 shrink-0">
                        {screen.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#d3c4b2] mt-0.5 line-clamp-1">
                    {screen.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-[#4f4537]/30 bg-[#121318] flex flex-wrap items-center justify-between gap-2 text-xs font-label-spatial text-[#9c8f7e]">
          <div className="flex items-center gap-2">
            <span>15 Screens Active</span>
            {onOpenContact && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="text-[#f4be65] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">mail</span>
                <span>Contact Atelier</span>
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded bg-[#d6a34d] text-[#281900] font-bold text-xs cursor-pointer hover:bg-[#f4bd65]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

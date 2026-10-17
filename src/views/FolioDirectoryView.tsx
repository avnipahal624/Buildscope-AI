import React, { useState } from 'react';
import { FOLIOS_DATA } from '../data/mockData';
import { FolioItem, AppScreen } from '../types';

interface FolioDirectoryViewProps {
  onNavigate: (screen: AppScreen) => void;
  onSelectFolio: (folio: FolioItem) => void;
  onShowToast: (message: string) => void;
}

export const FolioDirectoryView: React.FC<FolioDirectoryViewProps> = ({
  onNavigate,
  onSelectFolio,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Experimental' | 'Archived'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [foliosList, setFoliosList] = useState<FolioItem[]>(FOLIOS_DATA);
  const [showInitModal, setShowInitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');

  const filteredFolios = foliosList.filter((folio) => {
    const matchesTab =
      activeTab === 'All' ||
      (activeTab === 'Active' && folio.status === 'ACTIVE') ||
      (activeTab === 'Experimental' && folio.status === 'EXPERIMENTAL') ||
      (activeTab === 'Archived' && folio.status === 'ARCHIVED');

    const matchesSearch =
      folio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folio.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      folio.folioNumber.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleInitFolio = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newFolio: FolioItem = {
      id: `folio-${Date.now()}`,
      folioNumber: `FOLIO #${Math.floor(100 + Math.random() * 899)}-DS`,
      title: newTitle,
      subtitle: newSubtitle || 'Applied Robotics & Spatial Intelligence',
      status: 'ACTIVE',
      feasibility: 85,
      trl: 'TRL-4 Lab Prototype',
      payload: 'Payload: Sensor Suite 1.1kg',
      updated: 'Just now',
      simRuns: '1 Simulation Run'
    };

    setFoliosList([newFolio, ...foliosList]);
    setNewTitle('');
    setNewSubtitle('');
    setShowInitModal(false);
    onShowToast(`Folio "${newFolio.title}" initialized successfully`);
  };

  return (
    <main className="pt-20 px-3 sm:px-6 max-w-lg mx-auto pb-32">
      {/* Sub-Header Context & Telemetry Breadcrumb */}
      <div className="flex items-center justify-between text-label-spatial text-[11px] text-[#9c8f7e] uppercase tracking-wider">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[13px] text-[#f4be65]">folder_open</span>
          <span>Repository Index · {foliosList.length} Folios</span>
        </div>
        <span className="text-[#d1c5ad]/60">REV 24.11</span>
      </div>

      {/* Editorial Title */}
      <h1 className="mt-1 font-headline-lg-mobile text-[26px] text-[#eee1c8] font-normal tracking-tight">
        Project Folios & Repositories
      </h1>
      <p className="mt-1 font-body-sm text-xs text-[#d3c4b2]/80">
        Tactile spatial dossiers, hardware synthesis matrices, and defensible validation telemetry.
      </p>

      {/* Dedicated Search Bar */}
      <div className="mt-4 relative flex items-center shadow-lg">
        <div className="absolute left-3 flex items-center pointer-events-none text-[#9c8f7e]">
          <span className="material-symbols-outlined text-[19px]">search</span>
        </div>
        <input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search projects, hardware specs, folios..."
          className="w-full pl-10 pr-12 py-2.5 bg-[#1a1b20] border border-[#4f4537]/50 focus:border-[#d6a34d] rounded font-body-sm text-xs text-[#e3e2e8] placeholder:text-[#4f4537] focus:outline-none transition-all"
        />
        <button
          type="button"
          onClick={() => onShowToast('Filter parameters applied')}
          className="absolute right-2 px-1.5 py-1 rounded bg-[#1e1f24] border border-[#4f4537]/40 text-[#d3c4b2] hover:text-[#f4be65] active:scale-95 transition-all flex items-center cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
        </button>
      </div>

      {/* Status Filter Pills Carousel */}
      <nav className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-label-tag font-label-tag">
        <button
          type="button"
          onClick={() => setActiveTab('All')}
          className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'All'
              ? 'bg-[#d6a34d] text-[#573a00] font-semibold shadow-sm'
              : 'bg-[#1e1f24] border border-[#4f4537]/30 text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#573a00]" />
          <span>All Folios ({foliosList.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('Active')}
          className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs border flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'Active'
              ? 'bg-[#d6a34d] text-[#573a00] font-semibold border-[#d6a34d]'
              : 'bg-[#1e1f24] border-[#4f4537]/30 text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#f4be65]" />
          <span>Active (5)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('Experimental')}
          className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs border flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'Experimental'
              ? 'bg-[#d6a34d] text-[#573a00] font-semibold border-[#d6a34d]'
              : 'bg-[#1e1f24] border-[#4f4537]/30 text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac]" />
          <span>Experimental (4)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('Archived')}
          className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs border flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'Archived'
              ? 'bg-[#d6a34d] text-[#573a00] font-semibold border-[#d6a34d]'
              : 'bg-[#1e1f24] border-[#4f4537]/30 text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#9c8f7e]" />
          <span>Archived (3)</span>
        </button>
      </nav>

      {/* PROJECT REPOSITORY DIRECTORY */}
      <section className="mt-5 space-y-4">
        {filteredFolios.map((folio) => (
          <article
            key={folio.id}
            className={`relative rounded-lg border shadow-md overflow-hidden transition-transform duration-150 active:scale-[0.99] ${
              folio.isCurrent
                ? 'bg-[#292a2f] border-[#d6a34d]/40 ring-1 ring-[#d6a34d]/30'
                : folio.status === 'ARCHIVED'
                ? 'bg-[#1a1b20]/70 border-[#4f4537]/20 opacity-85'
                : 'bg-[#1e1f24] border-[#4f4537]/30'
            }`}
          >
            {/* Top Bar Accent */}
            <div className="flex items-center justify-between px-3 pt-2.5 pb-1 bg-[#34343a]/60 border-b border-[#4f4537]/30">
              <div className="flex items-center gap-2">
                {folio.isCurrent && (
                  <div className="px-2 py-0.5 rounded bg-[#d6a34d]/20 border border-[#d6a34d]/40 text-[#f4be65] font-label-spatial text-[9px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d6a34d] animate-ping" />
                    <span>CURRENT REPO</span>
                  </div>
                )}
                <span className="font-label-spatial text-[10px] text-[#9c8f7e]">
                  {folio.folioNumber}
                </span>
              </div>

              <span
                className={`px-2 py-0.5 rounded text-[10px] font-label-spatial font-semibold tracking-wider uppercase ${
                  folio.status === 'ACTIVE'
                    ? 'bg-[#d6a34d] text-[#281900]'
                    : folio.status === 'EXPERIMENTAL'
                    ? 'bg-[#a4b092]/30 border border-[#a4b092]/50 text-[#dbe7c6]'
                    : 'bg-[#34343a] text-[#d3c4b2]'
                }`}
              >
                {folio.status}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-3.5 space-y-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="font-headline-sm text-base text-[#eee1c8]">
                    {folio.title}
                  </h2>
                  <p className="font-body-sm text-xs text-[#f4be65]/90 mt-0.5 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    <span>{folio.subtitle}</span>
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onShowToast(`Pinned ${folio.title}`)}
                  className="p-1 text-[#d6a34d] hover:text-[#f4be65] active:scale-90 transition-transform cursor-pointer"
                  title="Pin Folio"
                >
                  <span className="material-symbols-outlined text-[18px]">push_pin</span>
                </button>
              </div>

              {/* Telemetry Progress */}
              <div className="mt-2 p-2.5 rounded bg-[#0d0e13]/80 border border-[#4f4537]/20 flex flex-col gap-1.5">
                <div className="flex items-center justify-between font-label-spatial text-[11px]">
                  <span className="text-[#d3c4b2] flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-[#bfcbac]" />
                    {folio.trl}
                  </span>
                  <span className="text-[#f4be65] font-semibold">{folio.feasibility}% Feasibility</span>
                </div>
                <div className="w-full bg-[#1e1f24] h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[#d6a34d] h-full rounded-full"
                    style={{ width: `${folio.feasibility}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#9c8f7e] font-label-spatial pt-0.5">
                  <span>{folio.payload}</span>
                  <span>{folio.updated}</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="px-3.5 py-2 bg-[#1a1b20] flex items-center justify-between border-t border-[#4f4537]/20 text-[#d3c4b2] font-label-tag text-xs">
              <span className="flex items-center gap-1 text-[#d1c5ad]">
                <span className="material-symbols-outlined text-[14px]">deployed_code</span>
                <span>{folio.simRuns || 'Simulation Ready'}</span>
              </span>
              <button
                type="button"
                onClick={() => {
                  onSelectFolio(folio);
                  onNavigate('discover');
                  onShowToast(`Active Folio set to: ${folio.title}`);
                }}
                className="text-[#f4be65] hover:underline text-[12px] font-medium flex items-center cursor-pointer"
              >
                Open Folio <span className="material-symbols-outlined text-[14px] ml-0.5">arrow_forward</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* BOTTOM ACTIONS */}
      <section className="pt-4 pb-6 space-y-2">
        <button
          type="button"
          onClick={() => setShowInitModal(true)}
          className="w-full py-3 px-4 rounded bg-[#d6a34d] text-[#281900] font-headline-sm text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-[#f4bd65] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>Initialize New Project Folio</span>
        </button>

        <button
          type="button"
          onClick={() => onShowToast('Connecting to Git Remote for spec ingestion...')}
          className="w-full py-2.5 px-4 rounded bg-[#1e1f24] border border-[#4f4537]/40 text-[#e3e2e8] font-body-md text-xs font-medium flex items-center justify-center gap-2 hover:border-[#d6a34d]/70 active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px] text-[#f4be65]">terminal</span>
          <span>Import Repository / Git Spec</span>
        </button>
      </section>

      {/* Init New Folio Modal */}
      {showInitModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowInitModal(false)}
        >
          <div
            className="bg-[#1a1b20] border border-[#f4be65]/40 rounded-xl p-5 w-full max-w-md space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#4f4537]/30 pb-2">
              <h3 className="font-headline-sm text-base text-[#e3e2e8]">
                Initialize New Project Folio
              </h3>
              <button
                type="button"
                onClick={() => setShowInitModal(false)}
                className="text-[#9c8f7e] hover:text-[#e3e2e8]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleInitFolio} className="space-y-3">
              <div>
                <label className="block text-xs font-label-spatial text-[#d3c4b2] mb-1">
                  Folio Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Stratospheric LiDAR Tether..."
                  className="w-full bg-[#1e1f24] border border-[#4f4537]/50 rounded px-3 py-2 text-xs text-[#e3e2e8] focus:border-[#f4be65] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-label-spatial text-[#d3c4b2] mb-1">
                  Sub-Field / Domain
                </label>
                <input
                  type="text"
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Atmospheric Robotics · Sensor Mesh"
                  className="w-full bg-[#1e1f24] border border-[#4f4537]/50 rounded px-3 py-2 text-xs text-[#e3e2e8] focus:border-[#f4be65] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded bg-[#d6a34d] text-[#281900] font-bold text-xs hover:bg-[#f4bd65] cursor-pointer"
                >
                  Create & Open Folio
                </button>
                <button
                  type="button"
                  onClick={() => setShowInitModal(false)}
                  className="px-4 py-2 rounded bg-[#1e1f24] text-[#d3c4b2] text-xs border border-[#4f4537]/40 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

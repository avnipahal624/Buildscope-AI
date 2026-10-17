import React, { useState } from 'react';
import { InteractiveArmillary3D } from '../components/InteractiveArmillary3D';
import { HOTLINKED_ASSETS, SPATIAL_CORE_NODES } from '../data/mockData';
import { SpatialNode, AppScreen } from '../types';
import { InspectorContent } from '../components/InspectorModal';

interface DiscoverViewProps {
  onNavigate: (screen: AppScreen) => void;
  onOpenInspector: (content: InspectorContent) => void;
  onShowToast: (message: string) => void;
}

export const DiscoverView: React.FC<DiscoverViewProps> = ({
  onNavigate,
  onOpenInspector,
  onShowToast
}) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeViewMode, setActiveViewMode] = useState<'feed' | '3d'>('feed');
  const [activeNode, setActiveNode] = useState<string | undefined>('core');
  const [bookmarkedCards, setBookmarkedCards] = useState<Record<string, boolean>>({
    lidar: false,
    osm: true
  });

  const filters = [
    'All',
    'Project Ideas',
    'Existing Solutions',
    'Research Papers',
    'GitHub Repos',
    'Datasets',
    'APIs & Tools',
    'Competition'
  ];

  const toggleBookmark = (id: string) => {
    setBookmarkedCards((prev) => {
      const next = !prev[id];
      onShowToast(next ? 'Added to Saved Folio Artifacts' : 'Removed from Saved Artifacts');
      return { ...prev, [id]: next };
    });
  };

  const handleSelectNode = (node: SpatialNode) => {
    setActiveNode(node.id);
    onOpenInspector({
      title: node.name,
      description: node.description,
      category: node.category,
      metric: node.metric,
      accentColor: node.accentColor
    });
  };

  return (
    <main className="pt-20 px-3 sm:px-6 md:px-8 max-w-6xl mx-auto pb-32 animate-fade-in-up">
      {/* Top Search & Filter Bar */}
      <section className="space-y-2.5 mb-5">
        <div className="relative flex items-center max-w-2xl">
          <span className="material-symbols-outlined absolute left-3.5 text-[#9c8f7e] text-[19px] pointer-events-none">
            travel_explore
          </span>
          <input
            type="text"
            placeholder="Discover ideas, research, datasets, and existing solutions..."
            className="w-full bg-[#1e1f24] border border-[#4f4537]/50 rounded-lg pl-10 pr-9 py-2.5 text-xs text-[#e3e2e8] placeholder:text-[#9c8f7e]/70 focus:outline-none focus:border-[#d6a34d] focus:ring-1 focus:ring-[#d6a34d]/40 transition-all shadow-sm"
          />
          <button
            type="button"
            onClick={() => onShowToast('Filter parameters adjusted')}
            className="absolute right-3 text-[#9c8f7e] hover:text-[#f4be65] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-label-tag text-[11px]">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => {
                setActiveFilter(filter);
                onShowToast(`Filtered by: ${filter}`);
              }}
              className={`shrink-0 px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                activeFilter === filter
                  ? 'bg-[#d6a34d] text-[#573a00] shadow-sm scale-[1.02]'
                  : 'bg-[#1e1f24] border border-[#4f4537]/35 text-[#d3c4b2] hover:border-[#f4be65]/60 hover:text-[#f4be65]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Responsive Two-Column Grid on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column on Desktop (Col 1-5): 3D Armillary Core + Passport Banner */}
        <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-20">
          {/* ARCHITECTURAL DUAL VIEW TOGGLE */}
          <section className="bg-[#1a1b20] p-1 rounded-lg border border-[#4f4537]/40 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setActiveViewMode('feed')}
              className={`flex-1 py-1.5 px-3 rounded text-center text-xs font-label-tag font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeViewMode === 'feed'
                  ? 'bg-[#d6a34d] text-[#573a00] shadow-sm'
                  : 'text-[#d3c4b2] hover:text-[#f4be65]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">auto_stories</span>
              <span>Pinterest Research Feed</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveViewMode('3d')}
              className={`flex-1 py-1.5 px-3 rounded text-center text-xs font-label-tag font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeViewMode === '3d'
                  ? 'bg-[#d6a34d] text-[#573a00] shadow-sm'
                  : 'text-[#d3c4b2] hover:text-[#f4be65]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">deployed_code</span>
              <span>3D Spatial Core</span>
            </button>
          </section>

          {/* 3D PROJECT CORE SPATIAL WORKSPACE CONTAINER */}
          <section
            id="spatial-workspace-container"
            className="rounded-xl border border-[#4f4537]/40 bg-[#1a1b20] overflow-hidden transition-all duration-300 shadow-xl card-hover-lift"
          >
            <div className="px-4 pt-3.5 pb-2 flex items-center justify-between border-b border-[#4f4537]/20">
              <div>
                <span className="font-label-spatial text-[10px] text-[#f4be65] tracking-widest uppercase">
                  Deep Inference Engine
                </span>
                <h2 className="font-headline-sm text-base sm:text-lg text-[#e3e2e8]">
                  3D Project Core Topology
                </h2>
              </div>
              <div className="flex items-center gap-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-label-spatial bg-[#1e1f24] text-[#bfcbac] border border-[#bfcbac]/30">
                  6 Nodes Active
                </span>
              </div>
            </div>

            {/* 3D Armillary Interactive Viewport */}
            <InteractiveArmillary3D
              onSelectNode={handleSelectNode}
              activeNodeId={activeNode}
            />

            {/* Core Telemetry Footer */}
            <div className="px-4 py-2.5 bg-[#1e1f24] flex items-center justify-between text-[11px] font-label-spatial border-t border-[#4f4537]/30">
              <span className="text-[#d3c4b2] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#f4be65]">token</span>
                Harmonic Alignment: <b className="text-[#f4be65]">91.4%</b>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigate('spatial-studio')}
                  className="text-[#bfcbac] hover:text-[#f4be65] hover:underline flex items-center gap-0.5 cursor-pointer font-semibold"
                >
                  <span className="material-symbols-outlined text-[13px]">deployed_code</span>
                  <span>3D Studio</span>
                </button>
                <span className="text-[#4f4537]">|</span>
                <button
                  type="button"
                  onClick={() => onNavigate('rubric')}
                  className="text-[#f4be65] hover:underline flex items-center gap-0.5 cursor-pointer font-medium"
                >
                  View Passport <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>

          {/* BUILDABILITY PASSPORT PREVIEW SHEET */}
          <section className="relative bg-gradient-to-b from-[#181a24] to-[#101117] rounded-xl border-2 border-[#f4be65]/40 p-4 shadow-2xl overflow-hidden card-hover-lift">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#f4be65]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#f4be65]/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-[#f4be65]/60 bg-[#f4be65]/15 flex items-center justify-center text-[#f4be65]">
                  <span className="material-symbols-outlined text-[18px]">verified_user</span>
                </div>
                <div>
                  <span className="text-[9px] font-label-spatial text-[#f4be65] uppercase tracking-widest block">
                    BuildScope Passport · Folio 884
                  </span>
                  <h3 className="font-headline-sm text-sm text-[#e3e2e8] font-bold">
                    Autonomous Drone Seedling v2.4
                  </h3>
                </div>
              </div>
              <div
                className="w-9 h-9 rounded-full bg-[#d6a34d] border-2 border-[#ffdead] shadow-md flex items-center justify-center text-[#281900] font-headline-sm font-bold text-xs"
                title="Wax Seal of Buildability"
              >
                BS
              </div>
            </div>

            {/* Verdict Banner */}
            <div className="my-2.5 p-2 rounded bg-[#d6a34d]/15 border border-[#f4be65]/50 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#f4be65] text-[18px]">verified</span>
                <span className="font-label-tag text-xs font-bold text-[#f4be65] tracking-wide">
                  BUILD WITH HIGH CONFIDENCE
                </span>
              </div>
              <span className="font-label-spatial text-xs font-bold text-[#e3e2e8] bg-[#1e1f24] px-2 py-0.5 rounded border border-[#4f4537]/40">
                91% Score
              </span>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-3 gap-2 text-center my-2.5">
              <div className="p-2 rounded bg-[#1e1f24] border border-[#4f4537]/30">
                <span className="text-[9px] font-label-spatial text-[#9c8f7e] block">Technical</span>
                <span className="font-label-spatial text-xs font-bold text-[#bfcbac]">94%</span>
              </div>
              <div className="p-2 rounded bg-[#1e1f24] border border-[#4f4537]/30">
                <span className="text-[9px] font-label-spatial text-[#9c8f7e] block">Competition</span>
                <span className="font-label-spatial text-xs font-bold text-[#f4be65]">92%</span>
              </div>
              <div className="p-2 rounded bg-[#1e1f24] border border-[#4f4537]/30">
                <span className="text-[9px] font-label-spatial text-[#9c8f7e] block">Risk Margin</span>
                <span className="font-label-spatial text-xs font-bold text-[#D99B78]">Low (8%)</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('rubric')}
                className="btn-tactile-gold flex-1 py-2 px-3 rounded font-label-tag text-xs font-bold text-center flex items-center justify-center gap-1 shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[15px]">description</span>
                <span>Open Complete Passport</span>
              </button>
              <button
                type="button"
                onClick={() => onShowToast('Exporting complete Folio #884-DS PDF Brief...')}
                className="btn-tactile-dark p-2 rounded text-[#d3c4b2] hover:text-[#f4be65] active:scale-95 cursor-pointer"
                title="Export PDF Brief"
              >
                <span className="material-symbols-outlined text-[17px]">ios_share</span>
              </button>
            </div>
          </section>
        </div>

        {/* Right Column on Desktop (Col 6-12): Curated Evidence & Artifacts Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-baseline justify-between pt-1">
            <div>
              <span className="text-[10px] font-label-spatial uppercase tracking-widest text-[#9c8f7e]">
                Tactile Studio Feed
              </span>
              <h3 className="font-headline-sm text-base text-[#e3e2e8]">
                Curated Evidence & Artifacts
              </h3>
            </div>
            <span className="text-xs text-[#9c8f7e] font-label-spatial">Showing 6 folio plates</span>
          </div>

          {/* MASONRY FEED (2-Column Responsive Staggered) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 items-start">
            {/* COLUMN 1 */}
            <div className="flex flex-col gap-3.5">
              {/* CARD 1: Autonomous Canopy LiDAR */}
              <article className="bg-[#292a2f] rounded-lg border border-[#4f4537]/35 overflow-hidden shadow-md group relative hover:border-[#f4be65]/50 card-hover-lift">
                <div className="relative overflow-hidden aspect-[3/4] bg-[#0d0e13]">
                  <img
                    alt="Archival field journal botanical notes and system logic"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={HOTLINKED_ASSETS.botanicalJournal}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-[#1a1b20]/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-label-spatial text-[#bfcbac] border border-[#bfcbac]/40">
                    <span className="material-symbols-outlined text-[11px]">verified</span>
                    <span>arXiv:2403.0112</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleBookmark('lidar')}
                    className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0d0e13]/85 flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
                      bookmarkedCards.lidar ? 'text-[#f4be65]' : 'text-[#d3c4b2] hover:text-[#f4be65]'
                    }`}
                    title="Save to Folio"
                  >
                    <span className="material-symbols-outlined text-[15px]">
                      {bookmarkedCards.lidar ? 'bookmark_added' : 'bookmark'}
                    </span>
                  </button>
                </div>
                <div className="p-3 space-y-1">
                  <span className="text-[10px] font-label-spatial text-[#f4be65]">
                    Paper #108 · Robotics
                  </span>
                  <h4 className="font-headline-sm text-xs font-semibold text-[#e3e2e8] line-clamp-2">
                    Autonomous Canopy LiDAR Mapping
                  </h4>
                  <p className="font-body-sm text-[11px] text-[#d3c4b2] line-clamp-2">
                    Botanical architecture tree trunk classification using edge flight computer.
                  </p>
                  <div className="pt-2 border-t border-[#4f4537]/20 flex items-center justify-between">
                    <span className="text-[10px] font-label-spatial text-[#9c8f7e]">Feasibility: 96%</span>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenInspector({
                          title: 'Autonomous Canopy LiDAR Mapping',
                          description:
                            'Paper #108 ArXiv validation detailing continuous canopy penetration via dual-frequency solid-state LiDAR. Compatible with DJI Manifold 2 edge TPU units.',
                          category: 'arXiv:2403.0112',
                          metric: '96% Feasibility',
                          accentColor: '#B8C4A5'
                        })
                      }
                      className="text-[11px] text-[#f4be65] hover:underline font-label-tag font-semibold cursor-pointer"
                    >
                      Inspect
                    </button>
                  </div>
                </div>
              </article>

              {/* CARD 3: Cream Paper Variant (Competitor Overlap Matrix) */}
              <article className="cream-paper-texture rounded-lg p-3 shadow-lg relative border border-[#79543A]/30 space-y-2 card-hover-lift">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-14 h-4 notebook-washi-tape rounded-xs rotate-[-1.5deg] pointer-events-none" />
                <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#79543A]">
                  <span className="flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-[13px]">table_chart</span> MATRIX 04
                  </span>
                  <span className="bg-[#222328] text-[#FAF3E5] px-1 rounded text-[8px] tracking-wider">
                    3 MITIGATED
                  </span>
                </div>
                <h4 className="font-headline-sm text-xs text-[#222328] font-bold leading-tight">
                  Competitor Overlap Matrix: GeoSpatial AI
                </h4>
                <div className="bg-[#F0E6D2] p-2 rounded border border-[#79543A]/20 text-[10px] font-label-spatial space-y-1 text-[#222328]">
                  <div className="flex justify-between border-b border-[#79543A]/20 pb-0.5">
                    <span>TerraDrone</span>
                    <span className="text-[#ffb4ab] font-bold">Closed SDK</span>
                  </div>
                  <div className="flex justify-between border-b border-[#79543A]/20 pb-0.5">
                    <span>BioSeed v1</span>
                    <span className="text-[#79543A]">GPS-Only</span>
                  </div>
                  <div className="flex justify-between text-[#404a32] font-bold">
                    <span>BuildScope (Us)</span>
                    <span>Vision SLAM</span>
                  </div>
                </div>
                <p className="text-[11px] font-annotation italic text-[#79543A] leading-relaxed">
                  "Direct competitive vulnerability discovered in low-altitude obstacle recovery."
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('competitors')}
                  className="w-full py-1.5 rounded bg-[#222328] text-[#FAF3E5] font-label-tag text-[10px] font-semibold text-center hover:bg-[#34343a] active:scale-95 transition-all cursor-pointer"
                >
                  Open Comparative Folio
                </button>
              </article>

              {/* CARD 5: Antique Gold Competition Rubric */}
              <article className="bg-[#1e1f24] rounded-lg border border-[#f4be65]/35 p-3 space-y-2 relative overflow-hidden card-hover-lift">
                <div className="flex items-center justify-between">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-label-spatial bg-[#d6a34d]/20 text-[#f4be65] border border-[#f4be65]/40 font-bold uppercase">
                    Hackathon Track
                  </span>
                  <span className="material-symbols-outlined text-[#f4be65] text-[15px]">
                    military_tech
                  </span>
                </div>
                <h4 className="font-headline-sm text-xs text-[#e3e2e8] font-semibold">
                  Climate AI Rubric Alignment
                </h4>
                <div className="space-y-1 text-[11px] font-body-sm text-[#d3c4b2]">
                  <div className="flex items-center justify-between">
                    <span>Technical Rigor</span>
                    <span className="font-label-spatial text-[#f4be65]">28/30</span>
                  </div>
                  <div className="w-full bg-[#34343a] h-1.5 rounded overflow-hidden">
                    <div className="bg-[#f4be65] h-full w-[93%]" />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#9c8f7e] pt-0.5">
                    <span>Judging Match:</span>
                    <span className="font-bold text-[#bfcbac]">94% Confidence</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate('rubric')}
                  className="w-full py-1 text-center font-label-spatial text-[10px] text-[#f4be65] bg-[#292a2f] rounded border border-[#4f4537]/35 hover:border-[#f4be65] transition-all cursor-pointer"
                >
                  Verify Requirements (12/12)
                </button>
              </article>
            </div>

            {/* COLUMN 2 */}
            <div className="flex flex-col gap-3.5">
              {/* CARD 2: Armillary Kinematic Map */}
              <article className="bg-[#1e1f24] rounded-lg border border-[#4f4537]/35 overflow-hidden shadow-md group relative hover:border-[#f4be65]/50 card-hover-lift">
                <div className="relative aspect-square bg-[#0c0d12] overflow-hidden flex items-center justify-center">
                  <img
                    alt="Orbital mechanical armillary device"
                    className="w-full h-full object-cover p-1 group-hover:scale-105 transition-transform duration-500"
                    src={HOTLINKED_ASSETS.armillarySphere}
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded text-[9px] font-label-spatial bg-[#0d0e13]/85 text-[#f4be65] border border-[#f4be65]/30">
                    Spatial Concept v1.2
                  </span>
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="font-headline-sm text-xs font-semibold text-[#e3e2e8]">
                    Armillary Kinematic Map
                  </h4>
                  <p className="font-body-sm text-[11px] text-[#d3c4b2] line-clamp-2">
                    Spatial node coordinate telemetry and gimbal axis constraints for autonomous sensor payload.
                  </p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[9px] font-label-spatial text-[#bfcbac]">Status: Linked</span>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenInspector({
                          title: 'Armillary Kinematic Map',
                          description:
                            '6-axis inertial motion profile with counter-torque stabilization for high-speed wind shears.',
                          category: 'Kinematics',
                          accentColor: '#D5D1E4'
                        })
                      }
                      className="text-[10px] text-[#f4be65] hover:underline font-label-tag cursor-pointer font-medium"
                    >
                      Explore 3D
                    </button>
                  </div>
                </div>
              </article>

              {/* CARD 4: OpenStreetMap Hydro Topo */}
              <article className="bg-[#292a2f] rounded-lg p-3 border border-[#4f4537]/35 space-y-2 relative card-hover-lift">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-label-spatial text-[#9c8f7e] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-[#f4be65]">database</span> DATASET
                  </span>
                  <span className="px-1 py-0.2 rounded bg-[#bfcbac]/10 text-[#bfcbac] border border-[#bfcbac]/30 text-[8px] font-label-spatial">
                    ODbL 1.0
                  </span>
                </div>
                <h4 className="font-headline-sm text-xs text-[#e3e2e8] font-semibold">
                  OpenStreetMap Hydro Topo
                </h4>
                <p className="font-body-sm text-[11px] text-[#d3c4b2]">
                  Pacific Northwest riverbed catchment vector geometries for seedling runoff risk modeling.
                </p>
                <div className="flex flex-wrap gap-1 text-[9px] font-label-spatial text-[#9c8f7e]">
                  <span className="bg-[#1e1f24] px-1.5 py-0.5 rounded border border-[#4f4537]/30">1.8 GB GeoJSON</span>
                  <span className="bg-[#1e1f24] px-1.5 py-0.5 rounded border border-[#4f4537]/30">24ms API</span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onOpenInspector({
                      title: 'OpenStreetMap Hydro Topo',
                      description:
                        'Stream network vector dataset formatted for offline SQLite spatiaLite storage directly inside the onboard companion drone board.',
                      category: 'Data Asset',
                      metric: '98% Topo Match'
                    })
                  }
                  className="w-full py-1 text-center font-label-tag text-[10px] text-[#d3c4b2] bg-[#1e1f24] rounded hover:text-[#f4be65] border border-[#4f4537]/30 transition-colors cursor-pointer"
                >
                  Inspect GeoJSON Feasibility
                </button>
              </article>

              {/* CARD 6: Edge TensorRT Feasibility Note */}
              <article className="cream-paper-texture rounded-lg p-3 relative border border-[#79543A]/30 space-y-1.5 card-hover-lift">
                <div className="w-10 h-3 notebook-washi-tape absolute -top-1.5 right-3 rotate-[2deg]" />
                <div className="flex items-center gap-1 text-[9px] font-label-spatial text-[#79543A] uppercase font-bold">
                  <span className="material-symbols-outlined text-[12px]">edit_note</span> Field Annotation
                </div>
                <h4 className="font-headline-sm text-xs text-[#222328] font-bold">
                  Edge TensorRT Feasibility Note
                </h4>
                <p className="font-annotation text-[12px] text-[#222328] italic leading-tight">
                  "YOLOv8-Nano compiled to FP16 achieves 42 FPS on Jetson Orin Nano with only 7.2W draw. Thermal budget validated under direct canopy heat."
                </p>
                <div className="flex items-center justify-between text-[9px] font-label-spatial text-[#79543A] pt-1 border-t border-[#79543A]/20">
                  <span>Signed: Dr. Vance</span>
                  <span className="font-bold text-[#222328]">Passes Specs</span>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

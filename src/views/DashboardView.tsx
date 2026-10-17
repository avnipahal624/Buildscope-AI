import React, { useState } from 'react';
import { HOTLINKED_ASSETS } from '../data/mockData';
import { AppScreen } from '../types';

interface DashboardViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [isOverrideActive, setIsOverrideActive] = useState(false);

  const handleExecuteOverride = () => {
    setIsOverrideActive(true);
    onShowToast('BLK-782 Override Executed: Protocol B-2 Micro-Auger deployed');
  };

  return (
    <main className="pt-20 px-3 sm:px-6 md:px-8 space-y-5 max-w-6xl mx-auto pb-32 animate-fade-in-up">
      {/* Active Folio Bar Switcher Strip */}
      <section className="flex items-center justify-between border-b border-[#4f4537]/30 pb-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#9c8f7e] text-[16px]">folder_special</span>
          <span className="font-label-spatial text-xs text-[#d3c4b2] font-medium">
            Autonomous Drone Seedling v2.4
          </span>
        </div>
        <div
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-label-spatial font-bold tracking-wider ${
            isOverrideActive
              ? 'bg-[#a4b092]/30 text-[#bfcbac] border border-[#bfcbac]/30'
              : 'bg-[#93000a] text-[#ffdad6]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {isOverrideActive ? 'OVERRIDE SEALED' : '1 HARD BLOCKER'}
        </div>
      </section>

      {/* Two-Column Responsive Grid on Desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Executive Scope, CAD Specimen, and Hard Blocker Alert */}
        <div className="lg:col-span-7 space-y-5">
          {/* Executive Header Section */}
          <section className="space-y-2">
        <div className="inline-flex items-center gap-1.5 text-[#f4be65]">
          <span className="material-symbols-outlined text-[16px]">architecture</span>
          <span className="font-label-tag text-[10px] uppercase tracking-widest text-[#d1c5ad]">
            Spatial Opportunity Validation
          </span>
        </div>
        <h1 className="text-display-hero-mobile text-[28px] sm:text-[34px] font-headline-lg-mobile text-[#e3e2e8] leading-tight tracking-tight">
          Know what it takes <span className="italic font-normal text-[#f4be65]">to build.</span>
        </h1>
        <p className="text-body-sm text-xs text-[#d3c4b2]">
          Synthesizing high-density autonomous robotics discovery into a defensible proof engine. All empirical vectors live and verified.
        </p>

        {/* Primary & Secondary Quick Actions */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => onNavigate('dependencies')}
            className="flex-1 bg-[#d6a34d] text-[#281900] py-2.5 px-3 rounded font-label-tag text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">add_circle</span>
            New Investigation
          </button>
          <button
            type="button"
            onClick={() => onNavigate('roadmap')}
            className="flex-1 bg-[#292a2f] border border-[#4f4537]/60 text-[#eee1c8] py-2.5 px-3 rounded font-label-tag text-xs font-medium flex items-center justify-center gap-1.5 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">history_edu</span>
            Resume Folio #884-DS
          </button>
        </div>
      </section>

      {/* Active Project Overview Card */}
      <section className="relative bg-[#1a1b20] rounded-lg p-4 border border-[#4f4537]/45 scribe-plate shadow-lg space-y-3">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-label-spatial text-[10px] text-[#f4be65]">CODENAME</span>
              <span className="px-1.5 py-0.2 rounded bg-[#1e1f24] font-label-spatial text-[11px] text-[#e3e2e8] tracking-wider font-semibold">
                BOREAL-DART-v2.4
              </span>
            </div>
            <p className="font-headline-sm text-base text-[#e3e2e8] pt-0.5 font-bold">
              Sub-Canopy Silviculture Drone
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#504836]/60 text-[#eee1c8] text-[10px] font-label-spatial border border-[#4f4537]/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f4be65]" />
            Bench Testing
          </span>
        </div>

        {/* Hardware Photo Specimen */}
        <div className="relative w-full h-44 rounded overflow-hidden border border-[#4f4537]/30 bg-[#0d0e13]">
          <img
            alt="Technical perspective photo of industrial carbon-fiber seedling drone"
            className="w-full h-full object-cover opacity-90"
            src={HOTLINKED_ASSETS.droneSpecimen}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b20] via-transparent to-transparent" />
          <div className="absolute bottom-2 left-2 flex items-center gap-2">
            <span className="px-1.5 py-0.5 bg-[#0d0e13]/90 backdrop-blur-sm rounded text-[9px] font-label-spatial text-[#bfcbac] border border-[#4f4537]/40">
              CAD: SLDPRT-884
            </span>
            <span className="px-1.5 py-0.5 bg-[#0d0e13]/90 backdrop-blur-sm rounded text-[9px] font-label-spatial text-[#9c8f7e] border border-[#4f4537]/40">
              PAYLOAD: 1.84 KG
            </span>
          </div>
        </div>

        {/* Parchment Quote Inset */}
        <div className="cream-paper-texture p-3.5 rounded shadow-md border-l-4 border-[#f4be65] space-y-1 relative text-[#222328]">
          <div className="flex items-center justify-between">
            <span className="font-label-spatial text-[9px] tracking-wider text-[#79543A] font-bold">
              EMPIRICAL HYPOTHESIS & STATEMENT
            </span>
            <span className="material-symbols-outlined text-[#79543A] text-[16px]">format_quote</span>
          </div>
          <p className="font-annotation text-xs leading-relaxed italic text-[#222328]">
            "Autonomous sub-canopy darting fails under dense boreal biomass due to soil hydraulic variance and pneumatic drop-off below 4.0 MPa cyclic reserve thresholds."
          </p>
          <div className="pt-1 flex items-center justify-between text-[10px] text-[#79543A]">
            <span className="font-semibold">Curator: Dr. H. Vance, Lead Spatial Systems</span>
            <span className="font-label-spatial">EXP-092-VALID</span>
          </div>
        </div>
      </section>

      {/* Critical Blocker Alert Card */}
      <section
        className={`border rounded p-4 space-y-3 relative transition-all ${
          isOverrideActive
            ? 'bg-[#1e1f24] border-[#bfcbac]/40'
            : 'bg-[#93000a]/20 border-[#ffb4ab]/50'
        }`}
      >
        <div className="flex items-start gap-2.5">
          <div
            className={`p-2 rounded flex items-center justify-center shrink-0 ${
              isOverrideActive ? 'bg-[#a4b092]/30 text-[#bfcbac]' : 'bg-[#93000a] text-[#ffdad6]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isOverrideActive ? 'verified' : 'gavel'}
            </span>
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span
                className={`font-label-tag text-[10px] uppercase tracking-widest font-bold ${
                  isOverrideActive ? 'text-[#bfcbac]' : 'text-[#ffb4ab]'
                }`}
              >
                {isOverrideActive ? 'PROTOCOL B-2 ACTIVE' : 'HARDWARE SAFETY GATE 00-HALT'}
              </span>
              <span className="text-[10px] font-label-spatial text-[#9c8f7e]">DARPA STTR §4.2</span>
            </div>
            <h2
              className={`font-headline-sm text-sm sm:text-base leading-snug font-bold ${
                isOverrideActive ? 'text-[#e3e2e8]' : 'text-[#ffb4ab]'
              }`}
            >
              3.2 MPa Dart Solenoid cyclic fatigue deficit
            </h2>
          </div>
        </div>

        <div className="bg-[#0d0e13]/80 p-3 rounded border border-[#4f4537]/30 space-y-2">
          <div className="flex justify-between items-center text-xs font-label-spatial">
            <span className="text-[#d3c4b2]">Measured Fatigue Rating</span>
            <span className={isOverrideActive ? 'text-[#bfcbac] font-bold' : 'text-[#ffb4ab] font-bold'}>
              {isOverrideActive ? 'Rotary Micro-Auger (185 RPM)' : '3.20 MPa (-20.0%)'}
            </span>
          </div>

          <div className="w-full bg-[#292a2f] h-2 rounded overflow-hidden relative">
            <div
              className={`h-full rounded ${isOverrideActive ? 'bg-[#bfcbac]' : 'bg-[#ffb4ab]'}`}
              style={{ width: isOverrideActive ? '100%' : '80%' }}
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-[#9c8f7e] font-label-spatial">
            <span>Bench Actuation #4,200</span>
            <span>Threshold Req: 4.00 MPa</span>
          </div>

          <p className="text-xs text-[#d3c4b2] pt-0.5">
            {isOverrideActive
              ? 'Waiver #782 active. Sub-canopy darting switched to rotary pre-drill mechanism with 100% soil penetration clearance.'
              : 'Halting FAA Sub-Part 107.82 & Flight Certification Level 0 until dynamic valve replacement or structural pressure diversion executes.'}
          </p>
        </div>

        {/* Action Triggers */}
        <div className="flex flex-col gap-2 pt-0.5">
          <button
            type="button"
            onClick={handleExecuteOverride}
            className={`w-full py-2.5 px-3 rounded font-label-tag text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-transform active:scale-95 ${
              isOverrideActive
                ? 'bg-[#a4b092] text-[#151e0a]'
                : 'bg-[#ffb4ab] text-[#690005] hover:bg-[#ffdad6]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isOverrideActive ? 'check_circle' : 'alt_route'}
            </span>
            <span>
              {isOverrideActive
                ? 'Fallback Protocol B-2 Active & Verified'
                : 'Switch to Fallback Protocol B-2'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onShowToast('Opening Blocker Docket BLK-782 waiver filings...')}
            className="w-full bg-[#292a2f] border border-[#4f4537] text-[#e3e2e8] py-2 px-3 rounded font-label-tag text-xs font-medium flex items-center justify-center gap-1.5 hover:border-[#f4be65] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[15px]">file_open</span>
            <span>Open Blocker Docket (BLK-782)</span>
          </button>
        </div>
      </section>
    </div>

    {/* Right Column: Readiness Matrix, Opportunity-to-Proof Trace, and Next Actions */}
    <div className="lg:col-span-5 space-y-5">
      {/* 6-Dimension Readiness Matrix */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-headline-sm text-sm sm:text-base text-[#e3e2e8]">Readiness Matrix</h2>
            <p className="text-xs text-[#9c8f7e]">6 Empirical Opportunity-to-Proof Pillars</p>
          </div>
          <span className="font-label-spatial text-xs text-[#f4be65] font-bold">Score: 4.2 / 6.0</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          {/* Pillar 01 */}
          <div className="bg-[#1a1b20] p-2.5 rounded border border-[#4f4537]/40 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e]">01. PROB</span>
              <span className="px-1 py-0.2 rounded bg-blue-900/30 text-blue-300 font-label-spatial text-[9px] border border-blue-700/40">
                Evidence
              </span>
            </div>
            <h3 className="font-label-tag text-xs text-[#e3e2e8] font-semibold">Problem Validation</h3>
            <p className="text-[11px] text-[#bfcbac] flex items-center gap-1 font-label-spatial">
              <span className="material-symbols-outlined text-[13px]">check_circle</span>
              100% Saturation
            </p>
          </div>

          {/* Pillar 02 */}
          <div className="bg-[#1a1b20] p-2.5 rounded border border-[#4f4537]/40 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e]">02. DIFF</span>
              <span className="px-1 py-0.2 rounded bg-[#bfcbac]/20 text-[#bfcbac] font-label-spatial text-[9px] border border-[#bfcbac]/40">
                Verified
              </span>
            </div>
            <h3 className="font-label-tag text-xs text-[#e3e2e8] font-semibold">Differentiation</h3>
            <p className="text-[11px] text-[#bfcbac] flex items-center gap-1 font-label-spatial">
              <span className="material-symbols-outlined text-[13px]">verified</span>
              Patent WO/2024/09
            </p>
          </div>

          {/* Pillar 03 */}
          <div className="bg-[#1a1b20] p-2.5 rounded border border-[#4f4537]/40 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e]">03. RSCH</span>
              <span className="px-1 py-0.2 rounded bg-[#d6a34d]/20 text-[#f4be65] font-label-spatial text-[9px] border border-[#d6a34d]/40">
                Review
              </span>
            </div>
            <h3 className="font-label-tag text-xs text-[#e3e2e8] font-semibold">Research Integrity</h3>
            <p className="text-[11px] text-[#f4be65] flex items-center gap-1 font-label-spatial">
              <span className="material-symbols-outlined text-[13px]">pending</span>
              Needs Review
            </p>
          </div>

          {/* Pillar 04 */}
          <div className="bg-[#1a1b20] p-2.5 rounded border border-[#4f4537]/40 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e]">04. EXEC</span>
              <span className="px-1 py-0.2 rounded bg-[#34343a] text-[#eee1c8] font-label-spatial text-[9px] border border-[#4f4537]">
                Assumed
              </span>
            </div>
            <h3 className="font-label-tag text-xs text-[#e3e2e8] font-semibold">Technical Execution</h3>
            <p className="text-[11px] text-[#d3c4b2] flex items-center gap-1 font-label-spatial">
              <span className="material-symbols-outlined text-[13px]">memory</span>
              Bench Validated
            </p>
          </div>

          {/* Pillar 05 */}
          <div
            className={`p-2.5 rounded border space-y-1 ${
              isOverrideActive
                ? 'bg-[#1a1b20] border-[#bfcbac]/40'
                : 'bg-[#1a1b20] border-[#ffb4ab]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#ffb4ab]">05. DEPN</span>
              <span
                className={`px-1 py-0.2 rounded font-label-spatial text-[9px] font-bold ${
                  isOverrideActive
                    ? 'bg-[#bfcbac]/20 text-[#bfcbac]'
                    : 'bg-[#93000a] text-[#ffdad6]'
                }`}
              >
                {isOverrideActive ? 'Resolved' : 'Blocked'}
              </span>
            </div>
            <h3 className="font-label-tag text-xs text-[#e3e2e8] font-semibold">Dependency Status</h3>
            <p
              className={`text-[11px] flex items-center gap-1 font-label-spatial ${
                isOverrideActive ? 'text-[#bfcbac]' : 'text-[#ffb4ab]'
              }`}
            >
              <span className="material-symbols-outlined text-[13px]">
                {isOverrideActive ? 'check_circle' : 'block'}
              </span>
              {isOverrideActive ? 'B-2 Micro-Auger' : 'Dart Solenoid 3.2 MPa'}
            </p>
          </div>

          {/* Pillar 06 */}
          <div className="bg-[#1a1b20] p-2.5 rounded border border-[#4f4537]/40 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e]">06. VERF</span>
              <span className="px-1 py-0.2 rounded bg-[#d6a34d]/20 text-[#f4be65] font-label-spatial text-[9px] border border-[#d6a34d]/40">
                Review
              </span>
            </div>
            <h3 className="font-label-tag text-xs text-[#e3e2e8] font-semibold">Coverage Breadth</h3>
            <p className="text-[11px] text-[#f4be65] flex items-center gap-1 font-label-spatial">
              <span className="material-symbols-outlined text-[13px]">checklist</span>
              75% Traceable
            </p>
          </div>
        </div>
      </section>

      {/* Opportunity-to-Proof Trace */}
      <section className="bg-[#1a1b20] rounded p-4 border border-[#4f4537]/40 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#f4be65] text-[18px]">account_tree</span>
            <h2 className="font-headline-sm text-sm sm:text-base text-[#e3e2e8]">
              Opportunity-to-Proof Trace
            </h2>
          </div>
          <span className="text-[10px] font-label-spatial text-[#9c8f7e]">CHAIN #TK-98</span>
        </div>
        <p className="text-xs text-[#d3c4b2]">
          Linear causal link from user need to flight verification. Red node denotes critical disruption.
        </p>

        {/* Step Flow */}
        <div className="overflow-x-auto no-scrollbar flex items-stretch gap-2 py-1">
          <div className="shrink-0 w-36 bg-[#1e1f24] p-2.5 rounded border border-[#4f4537]/40 flex flex-col justify-between text-xs">
            <div>
              <div className="flex justify-between items-center text-[9px] font-label-spatial text-[#9c8f7e] mb-1">
                <span>01. NEED</span>
                <span className="text-[#bfcbac]">CONFIRMED</span>
              </div>
              <p className="font-label-tag text-[11px] text-[#e3e2e8] font-semibold">
                Reforest 400 Ha/day in steep slopes
              </p>
            </div>
            <div className="pt-2 text-[9px] font-label-spatial text-[#9c8f7e]">Weyerhaeuser Ops</div>
          </div>

          <div className="flex items-center text-[#9c8f7e]">
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </div>

          <div className="shrink-0 w-36 bg-[#1e1f24] p-2.5 rounded border border-[#4f4537]/40 flex flex-col justify-between text-xs">
            <div>
              <div className="flex justify-between items-center text-[9px] font-label-spatial text-[#9c8f7e] mb-1">
                <span>02. EVIDENCE</span>
                <span className="text-[#bfcbac]">VERIFIED</span>
              </div>
              <p className="font-label-tag text-[11px] text-[#e3e2e8] font-semibold">
                Manual planting costs $1,800/Ha
              </p>
            </div>
            <div className="pt-2 text-[9px] font-label-spatial text-[#9c8f7e]">BC Forestry '23</div>
          </div>

          <div className="flex items-center text-[#9c8f7e]">
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          </div>

          <div
            className={`shrink-0 w-40 p-2.5 rounded border-2 flex flex-col justify-between text-xs ${
              isOverrideActive
                ? 'bg-[#1e1f24] border-[#bfcbac]'
                : 'bg-[#93000a]/20 border-[#ffb4ab]'
            }`}
          >
            <div>
              <div
                className={`flex justify-between items-center text-[9px] font-label-spatial mb-1 ${
                  isOverrideActive ? 'text-[#bfcbac]' : 'text-[#ffb4ab]'
                }`}
              >
                <span>04. TASK</span>
                <span>{isOverrideActive ? 'RESOLVED' : 'HALTED'}</span>
              </div>
              <p
                className={`font-label-tag text-[11px] font-semibold ${
                  isOverrideActive ? 'text-[#e3e2e8]' : 'text-[#ffb4ab]'
                }`}
              >
                {isOverrideActive
                  ? 'Protocol B-2 Rotary Pre-Drill'
                  : 'Dart Solenoid 4.0 MPa Burst Test'}
              </p>
            </div>
            <div
              className={`pt-2 text-[9px] font-label-spatial ${
                isOverrideActive ? 'text-[#bfcbac]' : 'text-[#ffb4ab]'
              }`}
            >
              {isOverrideActive ? 'Verified: 185 RPM' : 'Resolution: B-2 Fallback'}
            </div>
          </div>
        </div>
      </section>

      {/* Prioritized Next Actions */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-headline-sm text-sm sm:text-base text-[#e3e2e8]">
            Prioritized Next Actions
          </h2>
          <span className="font-label-spatial text-[10px] text-[#9c8f7e]">3 TASKS ACTIVE</span>
        </div>

        <div className="space-y-2">
          {/* Action 1 */}
          <div className="bg-[#1a1b20] p-3 rounded border border-[#4f4537]/40 border-l-4 border-l-[#ffb4ab] space-y-1">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-label-spatial text-[10px] text-[#ffb4ab] font-semibold">
                <span className="material-symbols-outlined text-[13px]">error</span>
                BLK-782 • CRITICAL RESOLUTION
              </span>
              <span className="text-[10px] font-label-spatial text-[#9c8f7e]">ETA: 4h</span>
            </div>
            <h3 className="font-headline-sm text-sm text-[#e3e2e8] font-semibold">
              Calibrate Protocol B-2 Micro-Auger Pre-Drill
            </h3>
            <p className="text-xs text-[#d3c4b2]">
              Bypass high-pressure pneumatic darting by deploying 12,000 RPM titanium planetary auger to maintain penetration depth at &lt;2.8 MPa load.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#d1c5ad]">
                Assignee: Hardware Bench 04
              </span>
              <button
                type="button"
                onClick={handleExecuteOverride}
                className="bg-[#f4be65] text-[#432c00] px-3 py-1 rounded font-label-tag text-xs font-semibold flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                <span>Execute Override</span>
                <span className="material-symbols-outlined text-[13px]">play_arrow</span>
              </button>
            </div>
          </div>

          {/* Action 2 */}
          <div className="bg-[#1a1b20] p-3 rounded border border-[#4f4537]/40 border-l-4 border-l-[#f4be65] space-y-1">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1 font-label-spatial text-[10px] text-[#f4be65] font-semibold">
                <span className="material-symbols-outlined text-[13px]">speed</span>
                TSK-801 • MEDIUM PRIORITY
              </span>
              <span className="text-[10px] font-label-spatial text-[#9c8f7e]">ETA: Today</span>
            </div>
            <h3 className="font-headline-sm text-sm text-[#e3e2e8] font-semibold">
              MAVLink CAN-Bus Sub-Bus Telemetry Test
            </h3>
            <p className="text-xs text-[#d3c4b2]">
              Verify real-time CAN-FD packet latency between Pixhawk v6X and Jetson Orin Nano companion computer.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e]">
                Assignee: Comms & Nav Lead
              </span>
              <button
                type="button"
                onClick={() => onShowToast('Sub-bus ping: 2.1ms round-trip latency verified')}
                className="bg-[#292a2f] border border-[#4f4537] text-[#e3e2e8] px-3 py-1 rounded font-label-tag text-xs font-medium cursor-pointer"
              >
                Review Telemetry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Citation & Proof Audit Trail */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-[#9c8f7e]">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <h2 className="font-headline-sm text-sm text-[#e3e2e8]">Citation & Proof Audit Trail</h2>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('All 42 citations decrypted from ledger')}
            className="text-[10px] font-label-spatial text-[#f4be65] hover:underline cursor-pointer"
          >
            View All (42)
          </button>
        </div>

        <div className="space-y-1.5">
          <div className="bg-[#1a1b20] p-2.5 rounded border border-[#4f4537]/30 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-spatial text-[9px] text-[#bfcbac] flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[12px]">check_box</span>
                VERIFIED CITATION
              </span>
              <span className="font-label-spatial text-[9px] text-[#9c8f7e]">DOC-ID: NRC-2023-B</span>
            </div>
            <p className="text-[#e3e2e8] font-medium text-[11px]">
              National Research Council Canada: Sub-Canopy Airflow Dynamics in Boreal Larch Stands
            </p>
            <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#9c8f7e] pt-1 border-t border-[#4f4537]/20">
              <span>Linked to: SLAM Botanical Moat</span>
              <a
                href="#proof"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Proof hash verified: sha256:7d8a92...b31');
                }}
                className="text-[#f4be65] hover:underline flex items-center gap-0.5"
              >
                Proof Hash <span className="material-symbols-outlined text-[11px]">open_in_new</span>
              </a>
            </div>
          </div>

          <div className="bg-[#1a1b20] p-2.5 rounded border border-[#4f4537]/30 space-y-1 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-spatial text-[9px] text-[#ffb4ab] flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[12px]">warning</span>
                CONTRADICTION FLAGGED
              </span>
              <span className="font-label-spatial text-[9px] text-[#9c8f7e]">
                DOC-ID: DARPA-STTR-§4.2
              </span>
            </div>
            <p className="text-[#e3e2e8] font-medium text-[11px]">
              Tactical Unmanned Delivery Standards: Solenoid Pneumatic Cyclic Fatigue Tolerance Limits
            </p>
            <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#9c8f7e] pt-1 border-t border-[#4f4537]/20">
              <span className="text-[#ffb4ab]">Triggered BLK-782 Halt</span>
              <button
                type="button"
                onClick={() => onShowToast('Opening Docket File BLK-782...')}
                className="text-[#f4be65] hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                Docket File <span className="material-symbols-outlined text-[11px]">open_in_new</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</main>
  );
};

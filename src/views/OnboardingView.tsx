import React, { useState } from 'react';
import { AppScreen } from '../types';

interface OnboardingViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const OnboardingView: React.FC<OnboardingViewProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [handle, setHandle] = useState('Aris Vandenberg');
  const [university, setUniversity] = useState('Stanford University · Center for Spatial AI');
  const [degree, setDegree] = useState('M.Sc. / M.Tech');
  const [branches, setBranches] = useState<string[]>(['AI & Machine Learning', 'Robotics & IoT']);
  const [yearTier, setYearTier] = useState('3rd Year');
  const [repo, setRepo] = useState('github.com/vandenberg-research');
  const [currentStep, setCurrentStep] = useState(1);

  const toggleBranch = (branch: string) => {
    setBranches((prev) =>
      prev.includes(branch) ? prev.filter((b) => b !== branch) : [...prev, branch]
    );
  };

  const handleNextStep = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
      onShowToast(`Progressed to Dossier Stage 0${currentStep + 1}`);
    } else {
      onShowToast('Dossier complete! Synchronizing with Active Folio #884-DS');
      onNavigate('discover');
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1b20] drafting-slate text-[#e3e2e8] flex flex-col justify-between pt-16 pb-24">
      {/* Top HUD: Archival Onboarding Stepper Header */}
      <div className="sticky top-12 z-30 bg-[#1a1b20]/95 backdrop-blur-md px-4 py-2 border-b border-[#4f4537]/30 shadow-sm max-w-6xl mx-auto w-full">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => onNavigate('discover')}
            className="inline-flex items-center gap-1 text-[#d3c4b2] hover:text-[#f4be65] transition-colors text-xs font-label-spatial cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Exit to Guest</span>
          </button>

          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-[#292a2f] border border-[#4f4537]/30 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f4be65] animate-pulse" />
            <span className="font-label-tag text-[10px] tracking-wider text-[#d1c5ad]">
              STUDENT ONBOARDING
            </span>
            <span className="text-[#4f4537]">|</span>
            <span className="font-label-spatial text-[10px] text-[#f4be65]">DOSSIER #24-A</span>
          </div>

          <div className="font-label-spatial text-xs text-[#d3c4b2] flex items-center gap-1">
            <span className="text-[#f4be65] font-semibold">Page {currentStep}</span>
            <span className="text-[#9c8f7e]">/</span>
            <span>6</span>
          </div>
        </div>

        {/* 6-Step Tactile Progress Bar */}
        <div className="grid grid-cols-6 gap-1.5 w-full pt-1">
          {[
            '01. Academic',
            '02. Vectors',
            '03. Matrix',
            '04. Challenges',
            '05. Spatial Lab',
            '06. Verification'
          ].map((label, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStep;
            const isActive = stepNum === currentStep;
            return (
              <div key={label} className="flex flex-col gap-0.5">
                <div
                  className={`h-1.5 rounded-sm transition-all ${
                    isActive
                      ? 'bg-[#d6a34d] shadow-[0_0_8px_rgba(214,163,77,0.5)]'
                      : isCompleted
                      ? 'bg-[#bfcbac]'
                      : 'bg-[#34343a] border border-[#4f4537]/20'
                  }`}
                />
                <span className="text-[9px] font-label-spatial text-[#9c8f7e] truncate hidden sm:block">
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto w-full px-4 py-4 flex-1 flex flex-col gap-4">
        {/* Title Segment */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-[#4f4537]/30 pb-3 gap-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#f4be65] text-[18px]">
                history_edu
              </span>
              <p className="font-label-spatial text-[10px] text-[#f4be65] tracking-widest uppercase">
                Atelier Curatorial Protocol
              </p>
            </div>
            <h1 className="font-headline-lg-mobile text-[24px] sm:text-[30px] text-[#e3e2e8] tracking-tight font-medium">
              Your Academic & Builder Dossier
            </h1>
          </div>
          <p className="font-annotation text-xs text-[#d1c5ad] italic sm:text-right max-w-xs">
            Step {currentStep} of 6 · Tell us where you are studying, building, and conceptualizing future architectures.
          </p>
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* LEFT / CENTER: Tactile Cream Parchment Journal Plate (8 Cols) */}
          <section className="lg:col-span-8 relative cream-paper-texture rounded-xl text-[#222328] p-4 sm:p-7 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.65)] border border-[#e8dec7] overflow-hidden">
            {/* Masking tape tabs */}
            <div className="absolute -top-2 left-1/4 w-16 h-4 notebook-washi-tape rotate-1 z-20" />
            <div className="absolute -top-2 right-1/4 w-14 h-4 notebook-washi-tape -rotate-2 z-20" />

            {/* Stamp Seal and Botanical Sketch */}
            <div className="absolute right-3 top-3 pointer-events-none select-none flex flex-col items-end opacity-80">
              <div className="border-2 border-dashed border-[#79543a]/40 rounded px-2 py-0.5 text-center rotate-3 bg-[#FAF3E5]/90 backdrop-blur-sm shadow-sm">
                <span className="font-label-spatial text-[8px] tracking-widest text-[#79543a] block font-bold">
                  ATELIER LABS REGISTRY
                </span>
                <span className="font-label-spatial text-[7px] text-[#79543a]/75 block">
                  VOL. XXIV · 2024-2025
                </span>
              </div>
              <svg className="w-16 h-16 text-[#79543a]/20 mt-1 stroke-current fill-none stroke-[1.2]" viewBox="0 0 100 100">
                <path d="M 50 95 C 48 65 30 50 15 45 C 32 45 42 30 50 5 C 58 30 68 45 85 45 C 70 50 52 65 50 95 Z" />
                <path d="M 50 95 L 50 15" strokeDasharray="2 3" />
                <circle cx="50" cy="45" r="18" strokeDasharray="1 2" />
              </svg>
            </div>

            {/* Journal Content */}
            <div className="relative z-10 space-y-4">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#f3e9d2] text-[#6d4c35] text-[10px] font-label-spatial mb-1.5 border border-[#dfd2b5]">
                  <span className="material-symbols-outlined text-[13px]">auto_stories</span>
                  <span>FOLIO RECORD · SHEET 01</span>
                </div>
                <h2 className="font-headline-md text-xl sm:text-2xl text-[#222328] font-semibold leading-tight">
                  First, tell us where you're learning.
                </h2>
                <p className="font-body-md text-xs sm:text-sm text-[#56493b] mt-1 leading-relaxed">
                  We will synthesize your academic environment to curate defensive project recommendations, targeted peer teams, and benchmark research grants.
                </p>
              </div>

              {/* Form Inputs */}
              <div className="space-y-4 pt-1">
                {/* Full Name & University */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block font-label-spatial text-xs text-[#432c00] font-semibold">
                      Full Name / Preferred Handle
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        placeholder="e.g. Aris Vandenberg"
                        className="w-full bg-[#fdfbf7] border border-[#cfbe9f] rounded px-3 py-1.5 text-[#222328] font-body-md text-xs focus:outline-none focus:border-[#d6a34d]"
                      />
                      <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#9c8f7e] text-[16px]">
                        signature
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block font-label-spatial text-xs text-[#432c00] font-semibold">
                      College / University
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="Stanford, MIT, Berkeley..."
                        className="w-full bg-[#fdfbf7] border border-[#cfbe9f] rounded px-3 py-1.5 text-[#222328] font-body-md text-xs focus:outline-none focus:border-[#d6a34d]"
                      />
                      <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#d6a34d] text-[16px]">
                        verified
                      </span>
                    </div>
                    <p className="text-[10px] font-label-spatial text-[#79543a] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[11px]">hub</span>
                      <span>Autonomous campus registry verified</span>
                    </p>
                  </div>
                </div>

                {/* Degree / Program Architecture */}
                <div className="space-y-1">
                  <label className="block font-label-spatial text-xs text-[#432c00] font-semibold">
                    Degree / Program Architecture
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {['B.Tech / B.E.', 'M.Sc. / M.Tech', 'BCA / MCA', 'PhD / Research', 'Independent Builder'].map((deg) => (
                      <button
                        key={deg}
                        type="button"
                        onClick={() => setDegree(deg)}
                        className={`px-3 py-1 rounded text-xs transition-all cursor-pointer ${
                          degree === deg
                            ? 'bg-[#222328] text-[#f4bd65] font-semibold shadow-sm flex items-center gap-1'
                            : 'bg-[#f5ecda] text-[#55412b] border border-[#d8c7a6] hover:border-[#d6a34d]'
                        }`}
                      >
                        <span>{deg}</span>
                        {degree === deg && <span className="material-symbols-outlined text-[12px]">check</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Branch / Specialization Focus */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block font-label-spatial text-xs text-[#432c00] font-semibold">
                      Branch / Specialization Focus
                    </label>
                    <span className="text-[10px] font-annotation italic text-[#79543a]">
                      Multi-select enabled
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'AI & Machine Learning',
                      'Robotics & IoT',
                      'Computer Science',
                      'Design & HCI',
                      'Bio-Engineering'
                    ].map((branch) => {
                      const isSelected = branches.includes(branch);
                      return (
                        <button
                          key={branch}
                          type="button"
                          onClick={() => toggleBranch(branch)}
                          className={`px-2.5 py-1 rounded text-xs transition-all flex items-center gap-1 cursor-pointer ${
                            isSelected
                              ? 'bg-[#d6a34d]/25 text-[#222328] border-2 border-[#d6a34d] font-semibold shadow-xs'
                              : 'bg-[#f3ebd7] text-[#5b4a36] border border-[#cfc0a2] hover:bg-[#eadebf]'
                          }`}
                        >
                          {isSelected && (
                            <span className="material-symbols-outlined text-[#d6a34d] text-[14px]">
                              check_circle
                            </span>
                          )}
                          <span>{branch}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Year of Study */}
                <div className="space-y-1">
                  <label className="block font-label-spatial text-xs text-[#432c00] font-semibold">
                    Current Chronological Tier
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 max-w-sm">
                    {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Postgrad'].map((year) => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setYearTier(year)}
                        className={`py-1.5 text-center rounded text-xs font-label-spatial transition-all cursor-pointer ${
                          yearTier === year
                            ? 'bg-[#222328] text-[#f4bd65] font-bold shadow-sm ring-1 ring-[#d6a34d]'
                            : 'border border-[#cfbe9f] bg-[#f8f2e4] text-[#594631]'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Portfolio / Repo */}
                <div className="space-y-1">
                  <label className="block font-label-spatial text-xs text-[#432c00] font-semibold">
                    Portfolio or Code Repository Identity
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 font-label-spatial text-xs text-[#79543a]">
                      https://
                    </span>
                    <input
                      type="text"
                      value={repo}
                      onChange={(e) => setRepo(e.target.value)}
                      className="w-full bg-[#fdfbf7] border border-[#cfbe9f] rounded pl-18 pr-9 py-1.5 text-[#222328] font-label-spatial text-xs focus:outline-none focus:border-[#d6a34d]"
                    />
                    <span className="material-symbols-outlined absolute right-2.5 top-2 text-[#594631] text-[16px]">
                      deployed_code
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-[#79543a] pt-0.5">
                    <span>Will sync commit telemetry to generate skill weights</span>
                    <span className="font-label-spatial text-[#d6a34d] font-semibold">
                      Ready to parse
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Stamp */}
              <div className="border-t border-[#79543a]/20 pt-2 flex flex-wrap items-center justify-between text-[11px] text-[#79543a] font-label-spatial">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#79543a]" />
                  <span>FOLIO #IND-001 REGISTERED</span>
                </span>
                <span className="font-annotation italic text-[#56493b]">
                  Atelier System Security Protocol • Encrypted Ledger
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: Curator's Index & Sequence Previews (4 Cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-3">
            {/* Live Curator Summary Badge Card */}
            <div className="bg-[#292a2f] border border-[#4f4537]/30 rounded-lg p-3.5 space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-[#4f4537]/20">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f4be65] text-[18px]">badge</span>
                  <span className="font-label-spatial text-xs text-[#e3e2e8]">Curator's Index</span>
                </div>
                <span className="px-1.5 py-0.5 text-[9px] font-label-spatial bg-[#d6a34d]/20 text-[#f4be65] border border-[#d6a34d]/30 rounded">
                  SYNCHRONIZED
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#d3c4b2] font-label-spatial text-[11px]">Identity Match</span>
                  <span className="font-label-spatial text-[#f4be65] font-medium">98.4% Confidence</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#d3c4b2] font-label-spatial text-[11px]">Academic Track</span>
                  <span className="text-[#e3e2e8] font-label-spatial text-[11px]">M.Sc. · Spatial AI</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#d3c4b2] font-label-spatial text-[11px]">Active Vectors</span>
                  <span className="text-[#d1c5ad] font-label-spatial text-[11px]">2 Pinned</span>
                </div>
                <div className="w-full bg-[#0d0e13] h-1.5 rounded-full overflow-hidden mt-1">
                  <div className="bg-[#d6a34d] h-full w-[16.6%]" />
                </div>
                <p className="text-[10px] text-[#9c8f7e] italic font-annotation pt-1">
                  "First page establishes base eligibility for regional hardware fellowships and Stanford spatial sandbox access."
                </p>
              </div>
            </div>

            {/* Next in Sequence */}
            <div className="bg-[#1e1f24] rounded-lg border border-[#4f4537]/30 p-3.5 space-y-3">
              <div className="flex items-center justify-between border-b border-[#4f4537]/20 pb-2">
                <h3 className="font-headline-sm text-sm text-[#e3e2e8] font-medium flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#d1c5ad] text-[16px]">timeline</span>
                  <span>Next in Sequence</span>
                </h3>
                <span className="font-label-spatial text-[10px] text-[#f4be65]">Steps 2 — 4</span>
              </div>

              {/* Step 2 Preview */}
              <div className="p-2.5 bg-[#292a2f]/70 border border-[#4f4537]/30 rounded space-y-1">
                <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#9c8f7e]">
                  <span className="text-[#f4be65] font-semibold">STAGE 02</span>
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                </div>
                <h4 className="font-headline-sm text-xs text-[#e3e2e8]">
                  18 Technical Interest Vectors
                </h4>
                <p className="text-[11px] text-[#d3c4b2]">
                  Refine your compass across Generative AI, Edge SLAM, Bio-Acoustics, and Autonomous Agents.
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#34343a] text-[#eee1c8] font-label-spatial">
                    SLAM
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#34343a] text-[#eee1c8] font-label-spatial">
                    Diffusion
                  </span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#34343a] text-[#eee1c8] font-label-spatial">
                    +16 more
                  </span>
                </div>
              </div>

              {/* Step 3 Preview */}
              <div className="p-2.5 bg-[#292a2f]/40 border border-[#4f4537]/20 rounded space-y-0.5 opacity-80">
                <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#9c8f7e]">
                  <span>STAGE 03</span>
                  <span className="material-symbols-outlined text-[14px]">lock_clock</span>
                </div>
                <h4 className="font-headline-sm text-xs text-[#e3e2e8]">
                  Skill Matrix Calibration
                </h4>
              </div>
            </div>

            {/* Archival Quote */}
            <div className="p-2.5 bg-[#0d0e13]/80 border border-[#4f4537]/20 rounded text-[11px] font-annotation text-[#d1c5ad] italic flex items-start gap-1.5">
              <span className="material-symbols-outlined text-[#f4be65] text-[14px] mt-0.5">format_quote</span>
              <span>"The builder dossier is not a static resume; it is a live blueprint calibrated against spatial computing's edge."</span>
            </div>
          </aside>
        </div>
      </div>

      {/* Sticky Bottom Actions Bar */}
      <footer className="fixed bottom-0 left-0 w-full z-40 bg-[#0d0e13]/95 backdrop-blur-md border-t border-[#4f4537]/30 py-2.5 px-4 shadow-2xl">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              onShowToast('Skipped stage: default parameters assigned to Stanford AI track');
              onNavigate('discover');
            }}
            className="text-[#d3c4b2] hover:text-[#f4be65] text-xs font-label-spatial flex items-center gap-1 cursor-pointer"
          >
            <span>Skip for now</span>
            <span className="material-symbols-outlined text-[15px]">skip_next</span>
          </button>

          <button
            type="button"
            onClick={handleNextStep}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#d6a34d] text-[#281900] font-body-md text-xs font-semibold hover:bg-[#f4bd65] active:scale-95 shadow-md cursor-pointer transition-all"
          >
            <span>Continue to Interests ({currentStep + 1}/6)</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </footer>
    </main>
  );
};

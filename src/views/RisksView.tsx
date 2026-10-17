import React, { useState } from 'react';
import { RISKS_DATA } from '../data/mockData';
import { RiskItem, AppScreen } from '../types';

interface RisksViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const RisksView: React.FC<RisksViewProps> = ({ onNavigate, onShowToast }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [risksList, setRisksList] = useState<RiskItem[]>(RISKS_DATA);
  const [newThreatTitle, setNewThreatTitle] = useState('');
  const [newHazard, setNewHazard] = useState('');

  const filteredRisks = risksList.filter((risk) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'P0') return risk.priority.includes('P0');
    if (activeFilter === 'P1') return risk.priority.includes('P1');
    if (activeFilter === 'P2') return risk.priority.includes('P2');
    if (activeFilter === 'Mitigated') return risk.status.includes('MITIGATED') || risk.status.includes('VERIFIED');
    return true;
  });

  const handleAddRisk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThreatTitle.trim()) return;

    const newRisk: RiskItem = {
      id: `risk-${Date.now()}`,
      code: `RISK #0${risksList.length + 1}`,
      priority: 'P1 HIGH',
      priorityColor: '#D99B78',
      category: 'FIELD SENSING & TELEMETRY',
      status: 'IN TESTING (80%)',
      title: newThreatTitle,
      hazard: newHazard || 'Identified potential sensor occlusion or structural fatigue during rapid descent.',
      evidence: 'Lab Bench Log #492, Empirical Telemetry',
      mitigationTitle: 'AUTOMATED COMPENSATORY CONTROL',
      mitigationDesc: 'Secondary IMU fusion coupled with Kalman filter correction.',
      fallbackTitle: 'FAILSAFE RETREAT PROTOCOL',
      fallbackDesc: 'Emergency return-to-base sequence initiated if anomaly persists >500ms.',
      fallbackParam: 'TIMEOUT: 500ms'
    };

    setRisksList([newRisk, ...risksList]);
    setNewThreatTitle('');
    setNewHazard('');
    setShowAddModal(false);
    onShowToast('Empirical Threat successfully registered to Risk Register');
  };

  return (
    <main className="pt-20 px-3 sm:px-6 flex flex-col gap-5 max-w-3xl mx-auto pb-32">
      {/* SUB-NAV BREADCRUMB STRIP */}
      <div className="flex items-center justify-between text-label-spatial text-[#9c8f7e] text-[11px] pt-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[14px] text-[#bfcbac]">folder_open</span>
          <span>ATELIER_INFERENCE / INVESTIGATIONS / V2.4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[#f4be65] font-medium">TRL-6 STATUS</span>
          <span className="px-1.5 py-0.5 bg-[#292a2f] text-[#bfcbac] rounded text-[10px] border border-[#4f4537]/50">
            LIVE TELEMETRY
          </span>
        </div>
      </div>

      {/* HERO HEADER */}
      <section className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded text-[10px] font-label-spatial tracking-wider uppercase bg-[#292a2f] text-[#f4be65] border border-[#f4be65]/20">
            Spatial Hazard Matrix
          </span>
          <span className="text-label-spatial text-[#9c8f7e] text-[11px]">
            AUTONOMOUS DEPLOYMENT SPEC
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-[26px] sm:text-[32px] text-[#e3e2e8] tracking-tight">
          Risk Register & Fallback Matrix
        </h1>
        <p className="font-body-sm text-body-sm text-[#d3c4b2] max-w-xl">
          Architectural threat decomposition and fail-safe protocols for autonomous aerial seed capsule deployment in dense Pacific temperate rainforest canopies.
        </p>
      </section>

      {/* THREAT POSTURE / DASHBOARD METRIC CLUSTER */}
      <section className="p-4 rounded bg-[#1a1b20] border border-[#4f4537]/40 shadow-sm space-y-4 relative overflow-hidden">
        {/* Ambient Gold Gradient Hairline */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#f4be65]/50 to-transparent" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f4be65] text-[20px] fill-icon">
              shield_with_heart
            </span>
            <span className="font-label-tag uppercase tracking-wider text-[#d3c4b2] text-[11px]">
              Cumulative System Risk Posture
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1e1f24] border border-[#4f4537]/60">
            <span className="w-2 h-2 rounded-full bg-[#bfcbac]" />
            <span className="font-label-spatial text-[11px] text-[#bfcbac]">
              18% NET EXPOSURE (LOW-MODERATE)
            </span>
          </div>
        </div>

        {/* 4-Card Metric Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <div className="bg-[#1e1f24] p-2.5 rounded border border-[#4f4537]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#9c8f7e]">
              <span className="font-label-spatial text-[10px]">MONITORED THREATS</span>
              <span className="material-symbols-outlined text-[15px]">radar</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-headline-sm text-xl text-[#e3e2e8]">05</span>
              <span className="font-label-spatial text-[#9c8f7e] text-[11px]">Vectors</span>
            </div>
          </div>

          <div className="bg-[#1e1f24] p-2.5 rounded border border-[#4f4537]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#9c8f7e]">
              <span className="font-label-spatial text-[10px]">CRITICAL P0 BLOCKERS</span>
              <span className="material-symbols-outlined text-[15px] text-[#bfcbac]">verified</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-headline-sm text-xl text-[#bfcbac]">00</span>
              <span className="font-label-spatial text-[#bfcbac] text-[11px]">Unmitigated</span>
            </div>
          </div>

          <div className="bg-[#1e1f24] p-2.5 rounded border border-[#4f4537]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#9c8f7e]">
              <span className="font-label-spatial text-[10px]">VERIFIED MITIGATIONS</span>
              <span className="material-symbols-outlined text-[15px] text-[#d1c5ad]">task_alt</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-headline-sm text-xl text-[#d1c5ad]">03</span>
              <span className="font-label-spatial text-[#9c8f7e] text-[11px]">Empirical</span>
            </div>
          </div>

          <div className="bg-[#1e1f24] p-2.5 rounded border border-[#4f4537]/30 flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#9c8f7e]">
              <span className="font-label-spatial text-[10px]">FALLBACK PROTOCOLS</span>
              <span className="material-symbols-outlined text-[15px] text-[#f4be65]">alt_route</span>
            </div>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-headline-sm text-xl text-[#f4be65]">02</span>
              <span className="font-label-spatial text-[#f4be65] text-[11px]">Armed & Ready</span>
            </div>
          </div>
        </div>
      </section>

      {/* ARCHIVAL CALLOUT NOTE: TACTILE PAPER PLATE VARIANT */}
      <section className="relative pt-2">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-28 h-4 notebook-washi-tape rounded-sm rotate-[-1deg] z-10 pointer-events-none" />
        <div className="cream-paper-texture p-4 rounded text-[#121318] relative border border-[#d1c5ad]/60 shadow-xl">
          <div className="flex items-start justify-between border-b border-[#222328]/20 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#573a00] text-[18px]">warning</span>
              <span className="font-label-spatial text-[#573a00] tracking-wider text-[11px] font-bold">
                HARDWARE & FIELD HAZARD DISCLOSURE · PROTOCOL #RISK-2024
              </span>
            </div>
            <span className="font-label-spatial text-[10px] text-[#34343a] font-semibold">
              PAGE 14 OF FOLIO
            </span>
          </div>
          <p className="font-annotation text-[14px] leading-snug text-[#222328]">
            “Canopy multi-path satellite attenuation and root-zone ricochet represent primary mission loss vectors. Both require dual-redundant hardware fallbacks before lab sign-off and field release in Olympic Basin test sector.”
          </p>
          <div className="mt-3 flex items-center justify-between pt-2 border-t border-[#222328]/15 font-label-spatial text-[10px] text-[#34343a]">
            <span>SIGNED: DR. ARIS VANDENBERG</span>
            <span>AUTONOMOUS SYSTEMS CURATOR</span>
          </div>
        </div>
      </section>

      {/* FILTER TABS */}
      <section className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-label-tag font-label-tag">
        <button
          type="button"
          onClick={() => setActiveFilter('All')}
          className={`px-3 py-1.5 rounded-sm whitespace-nowrap active:scale-95 transition-transform flex items-center gap-1.5 shadow-sm cursor-pointer ${
            activeFilter === 'All'
              ? 'bg-[#f4be65] text-[#432c00] font-semibold'
              : 'bg-[#1e1f24] text-[#d3c4b2] hover:text-[#f4be65] border border-[#4f4537]/40'
          }`}
        >
          <span>All Risks</span>
          <span className="px-1 py-0.2 rounded bg-black/15 text-[10px]">
            {risksList.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('P0')}
          className={`px-3 py-1.5 rounded-sm whitespace-nowrap border border-[#4f4537]/40 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'P0'
              ? 'bg-[#f4be65] text-[#432c00] font-semibold'
              : 'bg-[#1e1f24] text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
          <span>P0 Critical</span>
          <span className="text-[#9c8f7e] text-[10px]">1</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('P1')}
          className={`px-3 py-1.5 rounded-sm whitespace-nowrap border border-[#4f4537]/40 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'P1'
              ? 'bg-[#f4be65] text-[#432c00] font-semibold'
              : 'bg-[#1e1f24] text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#f4be65]" />
          <span>P1 High</span>
          <span className="text-[#9c8f7e] text-[10px]">2</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('P2')}
          className={`px-3 py-1.5 rounded-sm whitespace-nowrap border border-[#4f4537]/40 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'P2'
              ? 'bg-[#f4be65] text-[#432c00] font-semibold'
              : 'bg-[#1e1f24] text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac]" />
          <span>P2 Moderate</span>
          <span className="text-[#9c8f7e] text-[10px]">2</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter('Mitigated')}
          className={`px-3 py-1.5 rounded-sm whitespace-nowrap border border-[#4f4537]/40 active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer ${
            activeFilter === 'Mitigated'
              ? 'bg-[#f4be65] text-[#432c00] font-semibold'
              : 'bg-[#1e1f24] text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          <span className="material-symbols-outlined text-[13px] text-[#bfcbac]">check_circle</span>
          <span>Mitigated</span>
          <span className="text-[#9c8f7e] text-[10px]">3</span>
        </button>
      </section>

      {/* DETAILED RISK CARDS */}
      <section className="space-y-4">
        {filteredRisks.map((risk) => (
          <article
            key={risk.id}
            className="bg-[#1a1b20] rounded p-4 border border-[#4f4537]/40 space-y-3 relative hover:border-[#f4be65]/40 transition-colors"
          >
            {/* Top Status & Taxonomy Badges */}
            <div className="flex items-center justify-between border-b border-[#4f4537]/30 pb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-label-spatial text-[#f4be65] text-[11px] font-bold">
                  {risk.code}
                </span>
                <span className="text-[#9c8f7e] text-[10px]">•</span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-label-spatial font-bold border"
                  style={{
                    color: risk.priorityColor,
                    borderColor: `${risk.priorityColor}40`,
                    backgroundColor: `${risk.priorityColor}15`
                  }}
                >
                  {risk.priority}
                </span>
                <span className="text-[#9c8f7e] text-[10px]">•</span>
                <span className="font-label-spatial text-[#9c8f7e] text-[10px]">
                  {risk.category}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#bfcbac] font-label-tag text-[10px] bg-[#bfcbac]/10 px-2 py-0.5 rounded border border-[#bfcbac]/25">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                <span>{risk.status}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-headline-sm text-base text-[#e3e2e8] leading-tight">
              {risk.title}
            </h2>

            {/* Hazard & Root Cause */}
            <div className="bg-[#1e1f24]/70 p-3 rounded border border-[#4f4537]/20 space-y-1">
              <p className="font-body-sm text-xs text-[#d3c4b2]">
                <strong className="text-[#e3e2e8] font-medium">Hazard:</strong> {risk.hazard}
              </p>
              {risk.rootCause && (
                <p className="font-body-sm text-xs text-[#9c8f7e]">
                  <strong className="text-[#d3c4b2] font-medium">Root Cause:</strong> {risk.rootCause}
                </p>
              )}
            </div>

            {/* Evidence Pill */}
            <div className="flex items-center gap-2 text-label-spatial text-[#9c8f7e] text-[11px]">
              <span className="material-symbols-outlined text-[14px]">article</span>
              <span>{risk.evidence}</span>
            </div>

            {/* Active Mitigation */}
            <div className="bg-[#1e1f24] p-3 rounded border-l-2 border-[#bfcbac] space-y-1">
              <div className="flex items-center gap-1.5 text-[#bfcbac] font-label-spatial text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                <span>{risk.mitigationTitle}</span>
              </div>
              <p className="font-body-sm text-xs text-[#e3e2e8]">
                {risk.mitigationDesc}
              </p>
              {risk.mitigationResult && (
                <div className="text-label-spatial text-[10px] text-[#bfcbac]/80 pt-0.5">
                  {risk.mitigationResult}
                </div>
              )}
            </div>

            {/* Fallback Protocol */}
            <div className="bg-[#292a2f]/60 p-3 rounded border-l-2 border-[#D99B78] space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#D99B78] font-label-spatial text-[11px] font-semibold">
                  <span className="material-symbols-outlined text-[14px]">alt_route</span>
                  <span>{risk.fallbackTitle}</span>
                </div>
                {risk.fallbackParam && (
                  <span className="font-label-spatial text-[10px] text-[#9c8f7e]">
                    {risk.fallbackParam}
                  </span>
                )}
              </div>
              <p className="font-body-sm text-xs text-[#d3c4b2]">
                {risk.fallbackDesc}
              </p>
            </div>
          </article>
        ))}
      </section>

      {/* ACTIONS SECTION */}
      <section className="pt-2 pb-6 space-y-2">
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="w-full py-3.5 px-4 rounded bg-[#d6a34d] text-[#281900] font-headline-sm text-[16px] font-semibold flex items-center justify-center gap-2 hover:bg-[#f4bd65] active:scale-98 transition duration-150 shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add_circle</span>
          <span>+ Register Empirical Threat / Hazard</span>
        </button>

        <button
          type="button"
          onClick={() => onShowToast('Exporting FMEA Failure Mode & Effects Analysis report...')}
          className="w-full py-3 px-4 rounded bg-[#292a2f] border border-[#4f4537]/40 text-[#d1c5ad] font-label-tag text-xs flex items-center justify-center gap-2 hover:border-[#f4be65] hover:text-[#f4be65] active:scale-98 transition duration-150 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">sim_card_download</span>
          <span>Export Failure Mode & Effects Analysis (FMEA Folio)</span>
        </button>

        <div className="pt-2 text-center font-label-spatial text-[#9c8f7e] text-[10px] space-y-1">
          <div>FOLIO VERIFICATION HASH: 0x9F4C2...E89B1</div>
          <div>LAST LAB SYNC: 14:22:09 UTC • DUAL HARDWARE REDUNDANCY CONFIRMED</div>
        </div>
      </section>

      {/* Modal for adding new threat */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="bg-[#1a1b20] border border-[#f4be65]/40 rounded-xl p-5 w-full max-w-md space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#4f4537]/30 pb-2">
              <h3 className="font-headline-sm text-base text-[#e3e2e8]">
                Register Empirical Threat / Hazard
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#9c8f7e] hover:text-[#e3e2e8]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddRisk} className="space-y-3">
              <div>
                <label className="block text-xs font-label-spatial text-[#d3c4b2] mb-1">
                  Threat / Vector Title
                </label>
                <input
                  type="text"
                  required
                  value={newThreatTitle}
                  onChange={(e) => setNewThreatTitle(e.target.value)}
                  placeholder="e.g. Wet Conifer Static Charge Accumulation..."
                  className="w-full bg-[#1e1f24] border border-[#4f4537]/50 rounded px-3 py-2 text-xs text-[#e3e2e8] focus:border-[#f4be65] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-label-spatial text-[#d3c4b2] mb-1">
                  Hazard Description & Environmental Impact
                </label>
                <textarea
                  rows={3}
                  value={newHazard}
                  onChange={(e) => setNewHazard(e.target.value)}
                  placeholder="Describe failure mechanism and root cause..."
                  className="w-full bg-[#1e1f24] border border-[#4f4537]/50 rounded px-3 py-2 text-xs text-[#e3e2e8] focus:border-[#f4be65] focus:outline-none"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded bg-[#d6a34d] text-[#281900] font-bold text-xs hover:bg-[#f4bd65] cursor-pointer"
                >
                  Confirm & Seal in Ledger
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
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

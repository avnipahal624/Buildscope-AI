import React, { useState } from 'react';
import { AppScreen } from '../types';

interface TraceabilityViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const TraceabilityView: React.FC<TraceabilityViewProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [selectedNode, setSelectedNode] = useState<string>('tr-02');
  const [isCalibrated, setIsCalibrated] = useState(false);

  const handleCalibrate = () => {
    setIsCalibrated(true);
    onShowToast('Protocol B-2 Calibrated: 120 RPM stepper profile synchronized');
  };

  return (
    <main className="min-h-screen pt-20 pb-36 px-3 sm:px-6 max-w-md mx-auto bg-draft-slate relative select-none">
      {/* GRAPH CONTEXT SUB-HEADER / RADAR TOOLBAR */}
      <section className="bg-[#1a1b20]/95 backdrop-blur-md p-2.5 rounded-lg border border-[#4f4537]/30 shadow-sm mb-4">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-label-spatial text-[10px] px-1.5 py-0.5 rounded bg-[#d6a34d]/20 text-[#f4be65] border border-[#d6a34d]/30 shrink-0">
              #TK-98
            </span>
            <span className="text-xs text-[#e3e2e8] truncate font-medium">
              Sub-Canopy Reforestation
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="inline-flex p-0.5 rounded bg-[#1e1f24] border border-[#4f4537]/40 text-xs">
              <button
                type="button"
                className="px-2 py-0.5 rounded bg-[#d6a34d] text-[#281900] font-semibold text-[10px]"
              >
                Causal Flow
              </button>
              <button
                type="button"
                onClick={() => onShowToast('Switched to Hardware Tree decomposition view')}
                className="px-2 py-0.5 text-[#d3c4b2] hover:text-[#e3e2e8] text-[10px] cursor-pointer"
              >
                Hardware Tree
              </button>
            </div>

            {/* Minimap preview */}
            <div
              onClick={() => onShowToast('Centering graph viewport on active deficit TR-02')}
              className="relative w-7 h-7 rounded bg-[#292a2f] border border-[#4f4537]/40 flex items-center justify-center cursor-pointer"
              title="Spatial Minimap"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#f4be65] ring-2 ring-[#f4be65]/40" />
              <div className="absolute top-1 left-1.5 w-1 h-1 rounded-full bg-[#ffb4ab]" />
              <div className="absolute bottom-1 right-1.5 w-1 h-1 rounded-full bg-[#bfcbac]" />
            </div>
          </div>
        </div>
      </section>

      {/* Coordinate Datum Line */}
      <div className="flex items-center justify-between text-label-spatial text-[#9c8f7e] text-[10px] mb-6 px-1">
        <span className="flex items-center gap-1.5 tracking-wider">
          <span className="w-1.5 h-1.5 bg-[#f4be65] rounded-full" />
          DATUM: ORIGIN LAT 44.829 // DEPTH: 5 NODES
        </span>
        <span className="text-[#bfcbac]">CONF: 94.2%</span>
      </div>

      {/* SVG CONNECTIVITY OVERLAY */}
      <div className="relative">
        <svg
          className="absolute top-8 left-0 w-full h-[580px] pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="flowAmber" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#bfcbac" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffb4ab" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="flowDisrupted" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#ffb4ab" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#f4be65" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Node 1 to Node 2 */}
          <path
            d="M 60 65 C 60 100, 240 100, 240 140"
            fill="none"
            stroke="url(#flowAmber)"
            strokeWidth="2"
            className="pulse-flow"
          />

          {/* Node 2 to Node 3 */}
          <path
            d="M 240 220 C 240 250, 90 250, 90 290"
            fill="none"
            stroke="#ffb4ab"
            strokeDasharray="4 3"
            strokeWidth="2"
          />

          {/* Node 3 to Node 4 */}
          <path
            d="M 90 380 C 90 410, 230 410, 230 450"
            fill="none"
            stroke="url(#flowDisrupted)"
            strokeWidth="2.5"
            className="pulse-flow"
          />

          {/* Node 4 to Node 5 */}
          <path
            d="M 230 520 C 230 550, 100 550, 100 580"
            fill="none"
            stroke="#bfcbac"
            strokeWidth="2"
          />
        </svg>

        {/* NODE 1: STAKEHOLDER NEED */}
        <article
          onClick={() => setSelectedNode('sn-01')}
          className={`relative z-10 w-[80%] ml-1 mb-9 transition-transform cursor-pointer ${
            selectedNode === 'sn-01' ? 'scale-[1.02]' : ''
          }`}
        >
          <div className="bg-[#292a2f] border border-[#4f4537]/50 rounded p-3 shadow-lg relative">
            <div className="absolute -top-2 left-6 w-12 h-3 notebook-washi-tape -rotate-2" />
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-label-spatial text-[10px] text-[#bfcbac] flex items-center gap-1 font-semibold">
                SN-01 • STAKEHOLDER NEED
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#a4b092]/20 text-[#bfcbac] text-[9px] font-label-tag border border-[#bfcbac]/30">
                Verified
              </span>
            </div>
            <h3 className="font-headline-sm text-sm text-[#e3e2e8] mb-1.5 leading-tight">
              Reforest 400 Ha/day in steep canopy
            </h3>
            <div className="flex items-center justify-between text-[11px] text-[#d3c4b2] border-t border-[#4f4537]/30 pt-1.5 mt-1">
              <span className="flex items-center gap-1 font-label-spatial text-[10px]">
                <span className="material-symbols-outlined text-[13px] text-[#f4be65]">pin_drop</span>
                Cascade Range Grid 4
              </span>
              <span className="font-label-spatial text-[10px] text-[#9c8f7e]">v2.1</span>
            </div>
          </div>
        </article>

        {/* NODE 2: RESEARCH EVIDENCE */}
        <article
          onClick={() => setSelectedNode('re-01')}
          className={`relative z-10 w-[82%] ml-auto mb-9 transition-transform cursor-pointer ${
            selectedNode === 're-01' ? 'scale-[1.02]' : ''
          }`}
        >
          <div className="bg-[#1e1f24] border border-[#ffb4ab]/60 rounded p-3 shadow-lg relative">
            <div className="absolute -top-2.5 right-6 px-2 py-0.5 bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40 text-[9px] font-label-tag rounded flex items-center gap-1 shadow-sm font-bold">
              <span className="material-symbols-outlined text-[11px]">gavel</span>
              CONTRADICTION DETECTED
            </div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-label-spatial text-[10px] text-[#ffb4ab] flex items-center gap-1 font-semibold">
                RE-01 • RESEARCH EVIDENCE
              </span>
              <span className="text-label-spatial text-[10px] text-[#9c8f7e]">STTR.4</span>
            </div>
            <h3 className="font-headline-sm text-sm text-[#e3e2e8] mb-1">
              DARPA STTR §4.2 Overpressure Limit
            </h3>
            <p className="text-xs text-[#d3c4b2] mb-1.5">
              Acoustic burst criteria cap manifold delta at 3.0 MPa to mitigate avian roost stress in virgin canopy biomes.
            </p>
            <div className="flex items-center gap-1.5 pt-1.5 border-t border-[#4f4537]/30 text-label-spatial text-[10px] text-[#ffb4ab]">
              <span className="material-symbols-outlined text-[13px]">error_outline</span>
              <span>Invalidates legacy continuous purge spec</span>
            </div>
          </div>
        </article>

        {/* NODE 3: TECHNICAL SPEC (ACTIVE BLOCKED NODE) */}
        <article
          onClick={() => setSelectedNode('tr-02')}
          className="relative z-20 w-[85%] mr-auto mb-9 transition-transform cursor-pointer"
        >
          <div className="relative bg-[#34343a] border-2 border-[#f4be65] rounded p-3 shadow-2xl ring-1 ring-[#f4be65]/40">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-pulse" />
                <span className="text-label-spatial text-[10px] text-[#f4be65] font-bold">
                  TR-02 • TECHNICAL SPECIFICATION
                </span>
              </div>
              <span className="px-1.5 py-0.2 rounded bg-[#93000a]/30 text-[#ffb4ab] text-[9px] font-label-tag font-semibold border border-[#ffb4ab]/40 flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">block</span>
                Blocked / Disrupted
              </span>
            </div>

            <h3 className="font-headline-sm text-sm text-[#e3e2e8] font-semibold mb-2">
              Pneumatic Actuator Housing ≥ 4.0 MPa
            </h3>

            <div className="grid grid-cols-2 gap-2 p-2 rounded bg-[#0d0e13] border border-[#4f4537]/40 mb-2 font-label-spatial text-xs">
              <div>
                <span className="block text-[#9c8f7e] text-[9px]">CURRENT TARGET</span>
                <span className="text-[#e3e2e8] font-bold">4.0 MPa (Burst)</span>
              </div>
              <div>
                <span className="block text-[#ffb4ab] text-[9px]">LEGAL CEILING</span>
                <span className="text-[#ffb4ab] font-bold">3.0 MPa Max</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#f4be65] font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px]">touch_app</span>
                Inspect Inspection Sheet
              </span>
              <span className="material-symbols-outlined text-[15px] rotate-90">arrow_forward</span>
            </div>
          </div>
        </article>

        {/* NODE 4: FALLBACK ARTIFACT */}
        <article
          onClick={() => setSelectedNode('fb-01')}
          className={`relative z-10 w-[85%] ml-auto mb-9 transition-transform cursor-pointer ${
            selectedNode === 'fb-01' ? 'scale-[1.02]' : ''
          }`}
        >
          <div className="bg-[#292a2f] border border-[#d6a34d] rounded p-3 shadow-lg relative">
            <div className="absolute -top-2.5 left-8 px-2 py-0.5 bg-[#d6a34d] text-[#281900] text-[9px] font-label-tag font-bold rounded flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[12px]">alt_route</span>
              CONTINGENCY BRANCH B-2
            </div>
            <div className="flex items-center justify-between gap-2 mb-1 pt-1">
              <span className="text-label-spatial text-[10px] text-[#f4be65] flex items-center gap-1 font-semibold">
                FB-01 • FALLBACK ARTIFACT
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#d6a34d]/20 text-[#f4be65] text-[9px] font-label-tag border border-[#d6a34d]/30">
                Ready
              </span>
            </div>
            <h3 className="font-headline-sm text-sm text-[#e3e2e8] mb-1">
              Protocol B-2 Dual-Burrow Micro-Auger
            </h3>
            <p className="text-xs text-[#d3c4b2] mb-1.5">
              Replaces pneumatic high-impulse driver with 12V mechanical burrowing helix. Operates silently at 1.8 MPa acoustic envelope.
            </p>
            <div className="flex items-center gap-3 pt-1.5 border-t border-[#4f4537]/30 text-label-spatial text-[10px] text-[#bfcbac]">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">bolt</span> 84Wh Draw
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px]">weight</span> -320g Delta
              </span>
            </div>
          </div>
        </article>

        {/* NODE 5: HARDWARE BENCH */}
        <article
          onClick={() => setSelectedNode('ts-09')}
          className={`relative z-10 w-[80%] mr-auto mb-4 transition-transform cursor-pointer ${
            selectedNode === 'ts-09' ? 'scale-[1.02]' : ''
          }`}
        >
          <div className="bg-[#1e1f24] border border-[#bfcbac]/40 rounded p-3 shadow-md">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-label-spatial text-[10px] text-[#bfcbac] flex items-center gap-1 font-semibold">
                TS-09 • HARDWARE BENCH
              </span>
              <span className="px-1.5 py-0.2 rounded bg-[#bfcbac]/20 text-[#bfcbac] text-[9px] font-label-tag font-semibold">
                Passed
              </span>
            </div>
            <h3 className="font-headline-sm text-sm text-[#e3e2e8] mb-1">
              22ms SLAM FP16 Loop
            </h3>
            <div className="flex items-center justify-between text-xs text-[#d3c4b2] pt-1.5 border-t border-[#4f4537]/30 font-label-spatial text-[10px]">
              <span>Latency: 21.84ms</span>
              <span className="text-[#bfcbac]">Zero-Drift Validated</span>
            </div>
          </div>
        </article>
      </div>

      {/* DOCKED ACTIVE NODE INSPECTOR DRAWER */}
      <section className="fixed bottom-[58px] left-0 w-full z-30 bg-[#1a1b20]/95 backdrop-blur-xl border-t border-[#4f4537]/40 shadow-2xl p-3">
        <div className="max-w-md mx-auto space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-label-spatial text-xs text-[#f4be65] font-bold">
              <span className="material-symbols-outlined text-[15px]">troubleshoot</span>
              <span>INSPECTOR: TR-02</span>
            </div>
            <span className="text-[10px] font-label-tag text-[#9c8f7e] uppercase">
              TOUCH TO EXPAND
            </span>
          </div>

          <div className="bg-[#0d0e13] border border-[#4f4537]/50 rounded p-2.5 flex items-start gap-2.5">
            <div className="p-1 rounded bg-[#93000a]/30 text-[#ffb4ab] border border-[#ffb4ab]/30 shrink-0">
              <span className="material-symbols-outlined text-[18px]">warning</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#e3e2e8] leading-tight">
                TR-02: 3.2 MPa Pneumatic Solenoid Deficit
              </h4>
              <p className="text-[11px] text-[#d3c4b2] mt-0.5">
                DARPA STTR §4.2 limits manifold acoustic threshold. Deployment is flagged non-compliant.
              </p>
            </div>
          </div>

          <div className="space-y-1.5 text-xs font-label-spatial">
            <div className="flex items-center justify-between p-1.5 rounded bg-[#1e1f24] border border-[#4f4537]/30">
              <div className="flex items-center gap-1.5 truncate text-[11px]">
                <span className="material-symbols-outlined text-[15px] text-[#ffb4ab]">
                  arrow_upward
                </span>
                <span className="text-[#9c8f7e]">Upstream Contradiction:</span>
                <span className="text-[#e3e2e8] font-semibold truncate">RE-01 (Acoustic Cap)</span>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Verifying RE-01 Acoustic threshold against DARPA charter')}
                className="text-[#f4be65] hover:underline text-[10px] shrink-0 font-medium cursor-pointer"
              >
                Verify
              </button>
            </div>

            <div className="flex items-center justify-between p-1.5 rounded bg-[#1e1f24] border border-[#4f4537]/30">
              <div className="flex items-center gap-1.5 truncate text-[11px]">
                <span className="material-symbols-outlined text-[15px] text-[#f4be65]">
                  arrow_downward
                </span>
                <span className="text-[#9c8f7e]">Downstream Impact:</span>
                <span className="text-[#e3e2e8] font-semibold truncate">FAA Cat-3 Forest Cert</span>
              </div>
              <span className="px-1.5 py-0.2 rounded bg-[#93000a]/30 text-[#ffb4ab] text-[9px] shrink-0">
                Blocked
              </span>
            </div>
          </div>

          {/* Action triggers */}
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <button
              type="button"
              onClick={handleCalibrate}
              className={`flex items-center justify-center gap-1 px-3 py-2 rounded text-xs font-bold shadow transition-all cursor-pointer ${
                isCalibrated
                  ? 'bg-[#a4b092] text-[#151e0a]'
                  : 'bg-[#d6a34d] text-[#281900] hover:bg-[#f4bd65]'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {isCalibrated ? 'check' : 'tune'}
              </span>
              <span>{isCalibrated ? 'Calibrated' : 'Calibrate Protocol B-2'}</span>
            </button>
            <button
              type="button"
              onClick={() => onShowToast('Inspecting DARPA STTR §4.2 citation dossier...')}
              className="flex items-center justify-center gap-1 px-3 py-2 rounded bg-[#1e1f24] border border-[#4f4537] text-[#d1c5ad] text-xs font-medium hover:border-[#f4be65] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">menu_book</span>
              <span>Inspect Citation</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

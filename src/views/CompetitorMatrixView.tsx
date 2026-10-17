import React from 'react';
import { AppScreen } from '../types';

interface CompetitorMatrixViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const CompetitorMatrixView: React.FC<CompetitorMatrixViewProps> = ({
  onNavigate,
  onShowToast
}) => {
  return (
    <main className="pt-20 px-3 sm:px-6 space-y-5 max-w-lg mx-auto pb-32">
      {/* SUB-NAV BREADCRUMB & CONTEXT BANNER */}
      <section className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('discover')}
            className="text-label-tag text-[#d3c4b2] hover:text-[#f4be65] transition-colors cursor-pointer"
          >
            ← Core / Discover
          </button>
          <span className="text-[#9c8f7e] text-xs">/</span>
          <span className="text-label-spatial text-[#f4be65] text-[11px] bg-[#1e1f24] px-2 py-0.5 rounded border border-[#4f4537]/50">
            Drone Seedling v2.4
          </span>
        </div>
        <div className="flex items-center gap-1 text-[#bfcbac]">
          <span className="w-2 h-2 rounded-full bg-[#bfcbac] animate-pulse" />
          <span className="text-label-spatial text-[10px] uppercase tracking-wider">Live Sync</span>
        </div>
      </section>

      {/* PAGE HERO HEADER */}
      <section className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#f4be65] text-[22px]">difference</span>
          <h1 className="text-headline-lg-mobile text-[26px] sm:text-[30px] text-[#e3e2e8] tracking-tight">
            Competitor Matrix
          </h1>
        </div>
        <p className="text-body-sm text-xs text-[#d3c4b2]">
          Tactile research validation on spatial telemetry, payload autonomy, and proprietary market vulnerabilities under canopy cover.
        </p>
      </section>

      {/* HIGH-LEVEL METRICS RIBBON */}
      <section className="grid grid-cols-2 gap-2.5">
        <div className="bg-[#292a2f] p-3 rounded border border-[#4f4537]/30 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-label-spatial text-[#9c8f7e] text-[11px]">ENTITIES</span>
            <span className="material-symbols-outlined text-[#d1c5ad] text-[16px]">domain</span>
          </div>
          <div className="mt-2">
            <span className="text-headline-sm text-lg text-[#f4be65] font-bold">4 Competitors</span>
            <p className="text-label-tag text-[#d3c4b2] text-[10px]">Deep Technical Parity</p>
          </div>
        </div>

        <div className="bg-[#292a2f] p-3 rounded border border-[#4f4537]/30 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-label-spatial text-[#9c8f7e] text-[11px]">EXPOSURE</span>
            <span className="material-symbols-outlined text-[#ffb4ab] text-[16px]">bug_report</span>
          </div>
          <div className="mt-2">
            <span className="text-headline-sm text-lg text-[#ffb4ab] font-bold">3 Vulnerabilities</span>
            <p className="text-label-tag text-[#d3c4b2] text-[10px]">Canopy Flight Blindspots</p>
          </div>
        </div>

        <div className="bg-[#292a2f] p-3 rounded border border-[#4f4537]/30 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-label-spatial text-[#9c8f7e] text-[11px]">DIFFERENTIATION</span>
            <span className="material-symbols-outlined text-[#bfcbac] text-[16px]">verified</span>
          </div>
          <div className="mt-2">
            <span className="text-headline-sm text-lg text-[#bfcbac] font-bold">92% Score</span>
            <p className="text-label-tag text-[#d3c4b2] text-[10px]">Defensible Hardware IP</p>
          </div>
        </div>

        <div className="bg-[#292a2f] p-3 rounded border border-[#4f4537]/30 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-label-spatial text-[#9c8f7e] text-[11px]">MARKET RISK</span>
            <span className="material-symbols-outlined text-[#eee1c8] text-[16px]">shield</span>
          </div>
          <div className="mt-2">
            <span className="text-headline-sm text-lg text-[#eee1c8] font-bold">0 Direct Clones</span>
            <p className="text-label-tag text-[#d3c4b2] text-[10px]">Botanical SLAM Moat</p>
          </div>
        </div>
      </section>

      {/* CORE DIFFERENTIATION HYPOTHESIS: CREAM PAPER FOLIO CARD */}
      <section className="relative pt-3">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-20 h-4 notebook-washi-tape rounded-sm z-10 border border-[#9c8f7e]/20" />
        <div className="cream-paper-texture text-[#222328] p-5 rounded-lg shadow-2xl relative overflow-hidden border border-[#D9CDB8]">
          {/* Watermark Stamp Accent */}
          <div className="absolute -right-3 -bottom-3 w-24 h-24 rounded-full border-4 border-[#79543A]/15 flex items-center justify-center rotate-12 pointer-events-none">
            <span className="text-[9px] uppercase tracking-widest text-[#79543A]/40 font-label-spatial font-bold text-center">
              BUILDSCOPE
              <br />
              ARCHIVAL
              <br />
              PROVED
            </span>
          </div>

          <div className="flex items-center justify-between mb-3 border-b border-[#222328]/15 pb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#79543A] text-[#FAF3E5] flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[14px]">lock</span>
              </div>
              <span className="font-headline-sm text-[15px] font-bold tracking-tight text-[#222328]">
                Core Differentiation Hypothesis
              </span>
            </div>
            <span className="font-label-spatial text-[10px] bg-[#222328]/10 px-2 py-0.5 rounded text-[#222328] font-semibold">
              HYP-2024-09B
            </span>
          </div>

          <p className="font-annotation text-[13px] text-[#292A30] leading-relaxed italic mb-3">
            "Autonomous low-altitude canopy obstacle recovery with on-device Botanical SLAM (Jetson Orin Nano). Competitors rely on cloud-tethered GPS-only flight."
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[#222328]/10 text-xs">
            <span className="inline-flex items-center gap-1 bg-[#D99B78]/25 text-[#5F3018] px-2.5 py-1 rounded text-[11px] font-label-tag font-bold border border-[#D99B78]/40">
              <span className="material-symbols-outlined text-[13px]">priority_high</span>
              Evidence-Supported Limitation in TerraDrone & BioSeed
            </span>
          </div>
        </div>
      </section>

      {/* DETAILED INTERACTIVE COMPARISON MATRIX */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-headline-sm text-base text-[#e3e2e8]">Dimensional Breakdown</h2>
          <span className="text-label-spatial text-[#9c8f7e] text-[11px]">4 VECTORS VALIDATED</span>
        </div>

        <div className="space-y-3">
          {/* ROW 1: Edge SLAM & Spatial Vision */}
          <div className="bg-[#1e1f24] rounded-lg p-3.5 border border-[#4f4537]/40 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f4be65] text-[20px]">visibility</span>
                <h3 className="text-headline-sm text-[15px] font-semibold text-[#e3e2e8]">
                  Edge SLAM & Vision
                </h3>
              </div>
              <span className="bg-[#34343a] text-[#bfcbac] border border-[#bfcbac]/30 text-[10px] font-label-tag px-2 py-0.5 rounded uppercase">
                Core Moat
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {/* Our Project */}
              <div className="p-2.5 rounded bg-[#292a2f] border-l-2 border-[#f4be65] flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-label-tag font-bold text-[#f4be65]">BuildScope (Our Project)</span>
                  <span className="text-label-spatial text-[10px] text-[#bfcbac] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">check_circle</span> Verified On-device
                  </span>
                </div>
                <p className="text-body-sm text-xs text-[#e3e2e8]">
                  Dual-RGBD + Optical Flow with local point-cloud graph generation. Zero reliance on satellite uplink.
                </p>
              </div>

              {/* TerraDrone Agri-X */}
              <div className="p-2.5 rounded bg-[#1a1b20] border-l-2 border-[#4f4537] flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-label-tag text-[#d3c4b2] font-medium">TerraDrone Agri-X</span>
                  <span className="text-label-spatial text-[10px] text-[#ffb4ab] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">cancel</span> Closed SDK, Cloud-only
                  </span>
                </div>
                <p className="text-body-sm text-xs text-[#9c8f7e]">
                  Locks visual stream to proprietary cellular modem; crashes under dense wet canopy line.
                </p>
              </div>

              {/* BioSeed v1.2 */}
              <div className="p-2.5 rounded bg-[#1a1b20] border-l-2 border-[#4f4537] flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-label-tag text-[#d3c4b2] font-medium">BioSeed v1.2</span>
                  <span className="text-label-spatial text-[10px] text-[#ffb4ab] flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[12px]">warning</span> GPS-Only Mode
                  </span>
                </div>
                <p className="text-body-sm text-xs text-[#9c8f7e]">
                  Fails entirely under &gt;60% tree foliage due to multipath GNSS drift.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#4f4537]/30 flex items-center justify-between text-[11px] text-[#9c8f7e]">
              <span className="font-label-tag text-[#bfcbac]">Status: Evidence-Supported Limitation</span>
              <span className="font-label-spatial">US-2023-019 §4.2</span>
            </div>
          </div>

          {/* ROW 2: Compute & Latency */}
          <div className="bg-[#1e1f24] rounded-lg p-3.5 border border-[#4f4537]/40 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f4be65] text-[20px]">memory</span>
                <h3 className="text-headline-sm text-[15px] font-semibold text-[#e3e2e8]">
                  Compute & Latency
                </h3>
              </div>
              <span className="bg-[#34343a] text-[#f4be65] border border-[#f4be65]/30 text-[10px] font-label-tag px-2 py-0.5 rounded uppercase">
                Latency Critical
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-[#292a2f] border-l-2 border-[#f4be65] flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-label-tag font-bold text-[#f4be65]">BuildScope (Our Project)</span>
                  <span className="text-label-spatial text-[10px] text-[#f4be65]">Jetson Orin Nano (42 FPS)</span>
                </div>
                <p className="text-body-sm text-xs text-[#e3e2e8]">
                  Inference at 23ms latency. Real-time path branch recalculation at 4.2m/s flight speeds.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-[#1a1b20] rounded border border-[#4f4537]/30">
                  <span className="font-label-tag text-[#d3c4b2] block font-medium">TerraDrone</span>
                  <span className="text-label-spatial text-[#ffb4ab] text-[10px]">High Latency (480ms)</span>
                  <p className="text-[10px] text-[#9c8f7e] mt-1">4G LTE Dependent Roundtrip</p>
                </div>
                <div className="p-2 bg-[#1a1b20] rounded border border-[#4f4537]/30">
                  <span className="font-label-tag text-[#d3c4b2] block font-medium">BioSeed</span>
                  <span className="text-label-spatial text-[#9c8f7e] text-[10px]">N/A MCU (Cortex-M4)</span>
                  <p className="text-[10px] text-[#9c8f7e] mt-1">No Neural Processing Unit</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#4f4537]/30 flex items-center justify-between text-[11px] text-[#9c8f7e]">
              <span className="font-label-tag text-[#d1c5ad]">Status: Hypothesis Requiring Validation</span>
              <span className="font-label-spatial">Lab Flight Benchmark #14</span>
            </div>
          </div>

          {/* ROW 3: Payload Release Mechanism */}
          <div className="bg-[#1e1f24] rounded-lg p-3.5 border border-[#4f4537]/40 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f4be65] text-[20px]">deployed_code</span>
                <h3 className="text-headline-sm text-[15px] font-semibold text-[#e3e2e8]">
                  Payload Release
                </h3>
              </div>
              <span className="bg-[#34343a] text-[#d1c5ad] border border-[#d1c5ad]/30 text-[10px] font-label-tag px-2 py-0.5 rounded uppercase">
                Soil Penetration
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-[#292a2f] border-l-2 border-[#f4be65] flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <span className="font-label-tag font-bold text-[#f4be65]">BuildScope (Pneumatic Dart)</span>
                  <span className="text-label-spatial text-[10px] text-[#bfcbac]">3.2 MPa Impact</span>
                </div>
                <p className="text-body-sm text-xs text-[#e3e2e8]">
                  Pneumatic seed-capsule injector guarantees depth in mulch and moss layers.
                </p>
              </div>

              <div className="p-2.5 rounded bg-[#1a1b20] border-l-2 border-[#4f4537] flex justify-between items-center">
                <div>
                  <span className="font-label-tag text-[#d3c4b2] font-medium">TerraDrone Agri-X</span>
                  <p className="text-body-sm text-xs text-[#9c8f7e]">
                    Centrifugal broadcast spinner (94% wind drift surface bounce).
                  </p>
                </div>
                <span className="text-label-spatial text-[10px] text-[#ffb4ab] font-medium">
                  Loss &gt; 65%
                </span>
              </div>

              <div className="p-2.5 rounded bg-[#1a1b20] border-l-2 border-[#4f4537] flex justify-between items-center">
                <div>
                  <span className="font-label-tag text-[#d3c4b2] font-medium">CanopyFlight Ent.</span>
                  <p className="text-body-sm text-xs text-[#9c8f7e]">
                    Gravity passive hopper drop; fails root penetration.
                  </p>
                </div>
                <span className="text-label-spatial text-[10px] text-[#ffb4ab] font-medium">
                  Unanchored
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#4f4537]/30 flex items-center justify-between text-[11px] text-[#9c8f7e]">
              <span className="font-label-tag text-[#bfcbac]">Status: Potential Underserved Need</span>
              <span className="font-label-spatial">Forestry Field Log 08</span>
            </div>
          </div>

          {/* ROW 4: Licensing & Ecosystem */}
          <div className="bg-[#1e1f24] rounded-lg p-3.5 border border-[#4f4537]/40 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f4be65] text-[20px]">balance</span>
                <h3 className="text-headline-sm text-[15px] font-semibold text-[#e3e2e8]">
                  Licensing & Openness
                </h3>
              </div>
              <span className="bg-[#34343a] text-[#bfcbac] border border-[#bfcbac]/30 text-[10px] font-label-tag px-2 py-0.5 rounded uppercase">
                Market Stance
              </span>
            </div>

            <div className="p-2.5 rounded bg-[#292a2f] border-l-2 border-[#f4be65] space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-label-tag font-bold text-[#f4be65]">
                  BuildScope Permissive Pipeline
                </span>
                <span className="text-label-spatial text-[10px] text-[#bfcbac]">Apache 2.0 Core</span>
              </div>
              <p className="text-body-sm text-xs text-[#e3e2e8]">
                Extensible modular sensor node payload standard with open ROS2 package nodes.
              </p>
            </div>

            <div className="p-2.5 rounded bg-[#1a1b20] border-l-2 border-[#4f4537] space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-label-tag text-[#d3c4b2] font-medium">
                  Competitors Locked Ecosystem
                </span>
                <span className="text-label-spatial text-[10px] text-[#ffb4ab]">
                  Proprietary SaaS ($12k/yr)
                </span>
              </div>
              <p className="text-body-sm text-xs text-[#9c8f7e]">
                Both TerraDrone and CanopyFlight demand annual closed flight license locks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ATTACHED ARCHIVAL EVIDENCE */}
      <section className="bg-[#292a2f] p-4 rounded-lg border border-[#4f4537]/50 space-y-3">
        <div className="flex items-center justify-between border-b border-[#4f4537]/40 pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#d1c5ad] text-[18px]">attachment</span>
            <h2 className="font-headline-sm text-[15px] font-semibold text-[#eee1c8]">
              Attached Archival Evidence
            </h2>
          </div>
          <span className="text-label-spatial text-[10px] text-[#9c8f7e] font-mono">3 CITATIONS</span>
        </div>

        <div className="space-y-2">
          <div
            onClick={() => onShowToast('Opened Patent US-2023-019A1 archival folio')}
            className="flex items-center justify-between p-2 rounded bg-[#1e1f24] hover:bg-[#34343a] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="material-symbols-outlined text-[#9c8f7e] group-hover:text-[#f4be65] transition-colors text-[18px]">
                description
              </span>
              <div className="truncate">
                <span className="text-xs font-medium text-[#e3e2e8] block truncate">
                  Patent US-2023-019A1
                </span>
                <span className="text-label-spatial text-[10px] text-[#9c8f7e]">
                  Autonomous Canopy LiDAR Recovery Spec
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#9c8f7e] text-[16px]">north_east</span>
          </div>

          <div
            onClick={() => onShowToast('Opened TerraDrone Whitepaper 2023 verification')}
            className="flex items-center justify-between p-2 rounded bg-[#1e1f24] hover:bg-[#34343a] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="material-symbols-outlined text-[#9c8f7e] group-hover:text-[#f4be65] transition-colors text-[18px]">
                article
              </span>
              <div className="truncate">
                <span className="text-xs font-medium text-[#e3e2e8] block truncate">
                  TerraDrone Whitepaper 2023
                </span>
                <span className="text-label-spatial text-[10px] text-[#9c8f7e]">
                  Agri-X Cellular Latency Benchmarks (Tokyo Div)
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#9c8f7e] text-[16px]">north_east</span>
          </div>

          <div
            onClick={() => onShowToast('Opened BioSeed Hardware Teardown inspection')}
            className="flex items-center justify-between p-2 rounded bg-[#1e1f24] hover:bg-[#34343a] transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              <span className="material-symbols-outlined text-[#9c8f7e] group-hover:text-[#f4be65] transition-colors text-[18px]">
                build_circle
              </span>
              <div className="truncate">
                <span className="text-xs font-medium text-[#e3e2e8] block truncate">
                  BioSeed Hardware Teardown
                </span>
                <span className="text-label-spatial text-[10px] text-[#9c8f7e]">
                  FCC ID: 2AXBY-BS12 Board Inspection Report
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#9c8f7e] text-[16px]">north_east</span>
          </div>
        </div>
      </section>

      {/* ACTION DISPATCH BAR */}
      <section className="space-y-2 pt-1">
        <button
          type="button"
          onClick={() => {
            onShowToast('Differentiation proof successfully added to Passport Folio #884');
            onNavigate('rubric');
          }}
          className="w-full bg-[#d6a34d] text-[#281900] font-semibold py-3 px-4 rounded font-body-md flex items-center justify-center gap-2 shadow-lg hover:bg-[#f4bd65] active:scale-[0.98] transition-all cursor-pointer"
        >
          <span>Add Differentiation to Passport</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>

        <button
          type="button"
          onClick={() => onShowToast('Running feature gap validation against 14 competitive patents...')}
          className="w-full bg-[#1e1f24] text-[#d1c5ad] font-medium py-2.5 px-4 rounded font-body-md border border-[#4f4537]/40 hover:border-[#f4be65]/50 transition-colors flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">model_training</span>
          <span>Run Feature Gap Validation</span>
        </button>
      </section>
    </main>
  );
};

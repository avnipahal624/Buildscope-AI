import React, { useState } from 'react';
import { AppScreen } from '../types';

interface TriageViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const TriageView: React.FC<TriageViewProps> = ({ onNavigate, onShowToast }) => {
  const [gateClosed, setGateClosed] = useState(true);
  const [pingRunning, setPingRunning] = useState(false);

  const handleSwitchProtocol = () => {
    setGateClosed(false);
    onShowToast('Protocol B-2 engaged: Solenoid gate safely bypassed with Micro-Auger');
  };

  const handleRunPing = () => {
    setPingRunning(true);
    onShowToast('Sending 10,000 MAVLink CAN-FD packets over harness...');
    setTimeout(() => {
      setPingRunning(false);
      onShowToast('MAVLink 10k sweep passed: 0.00% frame loss, 1.4ms round-trip');
    }, 1200);
  };

  return (
    <main className="pt-20 px-3 sm:px-6 max-w-md mx-auto space-y-4 pb-32">
      {/* Project Intel Hero */}
      <section className="bg-[#292a2f] rounded-lg p-4 border border-[#4f4537]/30 shadow-md relative overflow-hidden">
        <div className="absolute -top-1 left-8 w-16 h-3 notebook-washi-tape border-x border-[#9c8f7e]/30 rounded-sm" />
        <div className="flex items-center justify-between mt-1 mb-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#f4be65] text-[16px]">terminal</span>
            <span className="font-label-spatial text-[10px] text-[#d1c5ad] font-medium tracking-wider uppercase">
              PROJECT INTEL
            </span>
          </div>
          <span className="font-label-spatial text-[10px] text-[#bfcbac] bg-[#1e1f24] px-2 py-0.5 rounded border border-[#bfcbac]/30">
            Bench Testing
          </span>
        </div>

        <h1 className="font-headline-lg-mobile text-[24px] sm:text-[28px] text-[#e3e2e8] tracking-tight leading-tight">
          BOREAL-DART-v2.4
        </h1>
        <p className="font-annotation text-xs text-[#d1c5ad] mt-0.5 italic">
          High-Velocity Sub-Permafrost Soil Sampling Unit
        </p>

        {/* Critical Safety Blocker Card (Cream Paper Plate Variant) */}
        <div className="mt-4 cream-paper-texture p-4 rounded-lg relative text-[#222328]">
          <div className="flex items-center justify-between mb-1.5 border-b border-[#79543A]/30 pb-1">
            <span className="font-label-spatial text-[9px] tracking-widest text-[#79543A] uppercase font-bold">
              DARPA-STTR §4.2 CRITICAL DEFICIT
            </span>
            <span
              className={`font-label-spatial text-[9px] px-1.5 py-0.2 rounded font-bold ${
                gateClosed ? 'bg-[#93000a] text-[#FAF3E5]' : 'bg-[#2a341d] text-[#FAF3E5]'
              }`}
            >
              {gateClosed ? 'GATE CLOSED' : 'WAIVER APPROVED'}
            </span>
          </div>

          <h2 className="font-headline-sm text-sm sm:text-base leading-snug font-bold text-[#222328] mb-1">
            3.2 MPa Dart Solenoid cyclic fatigue deficit (-20.0%)
          </h2>
          <p className="font-body-sm text-xs text-[#37301f] leading-relaxed mb-3">
            Telemetry indicates failure threshold at 1,420 cycles (spec requirement: 2,000 cycles at -38°C). Structural yield risks mechanical seizure during permafrost core recovery.
          </p>

          <div className="flex flex-col gap-2 pt-1">
            <button
              type="button"
              onClick={handleSwitchProtocol}
              className={`w-full font-label-tag text-xs font-semibold py-2 px-3 rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm ${
                !gateClosed
                  ? 'bg-[#a4b092] text-[#151e0a]'
                  : 'bg-[#d6a34d] text-[#281900] hover:bg-[#f4bd65]'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">alt_route</span>
              <span>{!gateClosed ? 'Protocol B-2 Active' : 'Switch to Fallback Protocol B-2'}</span>
            </button>
            <button
              type="button"
              onClick={() => onShowToast('Reviewing DARPA STTR §4.2 Waiver Docket #782...')}
              className="w-full bg-[#FAF3E5] border border-[#79543A]/40 text-[#222328] font-label-tag text-xs font-medium py-1.5 px-3 rounded flex items-center justify-center gap-1 hover:bg-[#eee1c8] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px] text-[#79543A]">assignment</span>
              <span>Review Waiver Docket #782</span>
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 1: TRIAGE STACK (Asymmetrical Carousel Cards) */}
      <section className="space-y-1.5">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#f4be65] text-[18px]">stacks</span>
            <h2 className="font-headline-sm text-sm sm:text-base text-[#e3e2e8]">Triage Stack</h2>
          </div>
          <span className="font-label-spatial text-[10px] text-[#9c8f7e]">3 Actionable Nodes</span>
        </div>

        {/* Carousel */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-2.5 no-scrollbar pb-1 pt-1 -mx-3 px-3">
          {/* Card 1 */}
          <div className="snap-center shrink-0 w-[270px] bg-[#1e1f24] rounded-lg p-3.5 border border-[#4f4537]/40 shadow-md flex flex-col justify-between relative">
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#93000a]/20 border border-[#ffb4ab]/30 px-1.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
              <span className="font-label-spatial text-[9px] text-[#ffb4ab] font-semibold">
                HIGH PRIORITY
              </span>
            </div>
            <div>
              <span className="font-label-spatial text-[10px] text-[#d1c5ad] block mb-1">
                ACT-4491 // STEPPER GAIN
              </span>
              <h3 className="font-headline-sm text-sm text-[#e3e2e8] mb-1 leading-tight">
                Calibrate Protocol B-2 Micro-Auger
              </h3>
              <p className="text-xs text-[#d3c4b2] line-clamp-2 mb-3">
                Torque sensor overload detected at 120 RPM. Immediate stepper parameter re-mapping required before run restart.
              </p>
            </div>
            <div className="pt-2 border-t border-[#4f4537]/30 flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e]">LATENCY: 4m ago</span>
              <button
                type="button"
                onClick={() => onShowToast('Stepper parameter override executed at 185 RPM')}
                className="bg-[#f4be65] text-[#432c00] font-label-tag text-xs font-semibold px-2.5 py-1 rounded flex items-center gap-1 active:scale-95 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">bolt</span>
                <span>Execute Override</span>
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="snap-center shrink-0 w-[270px] bg-[#1e1f24] rounded-lg p-3.5 border border-[#4f4537]/40 shadow-md flex flex-col justify-between relative">
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#504836]/40 border border-[#d1c5ad]/30 px-1.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f4be65]" />
              <span className="font-label-spatial text-[9px] text-[#d1c5ad] font-semibold">
                MED STATUS
              </span>
            </div>
            <div>
              <span className="font-label-spatial text-[10px] text-[#d1c5ad] block mb-1">
                BUS-08 // 5 Mbps PHY
              </span>
              <h3 className="font-headline-sm text-sm text-[#e3e2e8] mb-1 leading-tight">
                MAVLink CAN-FD Telemetry Test
              </h3>
              <p className="text-xs text-[#d3c4b2] line-clamp-2 mb-3">
                Frame drop rate at 0.08% over cryogenic harness. Requires 10,000 packet integrity sweep verification.
              </p>
            </div>
            <div className="pt-2 border-t border-[#4f4537]/30 flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e]">PACKETS: 9.8k/10k</span>
              <button
                type="button"
                onClick={handleRunPing}
                disabled={pingRunning}
                className="bg-[#292a2f] border border-[#4f4537] text-[#e3e2e8] font-label-tag text-xs px-2.5 py-1 rounded flex items-center gap-1 hover:border-[#f4be65] cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">
                  {pingRunning ? 'refresh' : 'restart_alt'}
                </span>
                <span>{pingRunning ? 'Pinging...' : 'Run Ping'}</span>
              </button>
            </div>
          </div>

          {/* Card 3 */}
          <div className="snap-center shrink-0 w-[270px] bg-[#1e1f24] rounded-lg p-3.5 border border-[#4f4537]/40 shadow-md flex flex-col justify-between relative">
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-[#a4b092]/20 border border-[#bfcbac]/30 px-1.5 py-0.5 rounded">
              <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac]" />
              <span className="font-label-spatial text-[9px] text-[#bfcbac] font-semibold">
                LOW PRIORITY
              </span>
            </div>
            <div>
              <span className="font-label-spatial text-[10px] text-[#d1c5ad] block mb-1">
                SUBSTRATE-SIM // LOAM
              </span>
              <h3 className="font-headline-sm text-sm text-[#e3e2e8] mb-1 leading-tight">
                Humus Loam Core Penetration
              </h3>
              <p className="text-xs text-[#d3c4b2] line-clamp-2 mb-3">
                Preliminary volumetric moisture model verified. Scheduled for cold chamber bench phase 3b.
              </p>
            </div>
            <div className="pt-2 border-t border-[#4f4537]/30 flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#bfcbac]">STABLE 94%</span>
              <button
                type="button"
                onClick={() => onShowToast('Substrate loam telemetry models inspected')}
                className="bg-[#292a2f] border border-[#4f4537] text-[#d1c5ad] font-label-tag text-xs px-2.5 py-1 rounded cursor-pointer"
              >
                Inspect
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: 6-DIMENSION FEASIBILITY PULSE */}
      <section className="bg-[#1e1f24] rounded-lg p-4 border border-[#4f4537]/30 shadow-md space-y-2">
        <div className="flex items-center justify-between border-b border-[#4f4537]/30 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#f4be65] text-[18px]">vital_signs</span>
            <h2 className="font-headline-sm text-sm sm:text-base text-[#e3e2e8]">
              6-Dimension Feasibility Pulse
            </h2>
          </div>
          <span className="font-label-spatial text-[10px] text-[#d1c5ad]">AUDIT v1.9</span>
        </div>

        <div className="space-y-2 pt-1 text-xs">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#e3e2e8]">1. Problem Validation</span>
              <span className="font-label-spatial text-[10px] text-[#bfcbac]">● Evidence Found</span>
            </div>
            <div className="h-1.5 w-full bg-[#0d0e13] rounded overflow-hidden">
              <div className="h-full bg-[#bfcbac] rounded" style={{ width: '88%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#e3e2e8]">2. Differentiation</span>
              <span className="font-label-spatial text-[10px] text-[#bfcbac]">● Verified</span>
            </div>
            <div className="h-1.5 w-full bg-[#0d0e13] rounded overflow-hidden">
              <div className="h-full bg-[#bfcbac] rounded" style={{ width: '95%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#f4be65] font-semibold">3. Research Integrity</span>
              <span className="font-label-spatial text-[10px] text-[#f4be65]">
                ● Needs Review (DARPA conflict)
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#0d0e13] rounded overflow-hidden">
              <div className="h-full bg-[#f4be65] rounded" style={{ width: '52%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#e3e2e8]">4. Technical Execution</span>
              <span className="font-label-spatial text-[10px] text-[#d3c4b2]">● Assumed</span>
            </div>
            <div className="h-1.5 w-full bg-[#0d0e13] rounded overflow-hidden">
              <div className="h-full bg-[#9c8f7e] rounded" style={{ width: '60%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#ffb4ab] font-semibold">5. Critical Dependency</span>
              <span className="font-label-spatial text-[10px] text-[#ffb4ab]">
                ● {gateClosed ? 'Blocked' : 'Waiver Active'}
              </span>
            </div>
            <div className="h-1.5 w-full bg-[#0d0e13] rounded overflow-hidden">
              <div
                className={`h-full rounded ${gateClosed ? 'bg-[#ffb4ab]' : 'bg-[#bfcbac]'}`}
                style={{ width: gateClosed ? '24%' : '100%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-[#e3e2e8]">6. Formal Verification</span>
              <span className="font-label-spatial text-[10px] text-[#d1c5ad]">● Needs Review</span>
            </div>
            <div className="h-1.5 w-full bg-[#0d0e13] rounded overflow-hidden">
              <div className="h-full bg-[#d1c5ad] rounded" style={{ width: '48%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: LIVE CRYPTOGRAPHIC AUDIT TRAIL */}
      <section className="bg-[#1e1f24] rounded-lg p-4 border border-[#4f4537]/30 shadow-md">
        <div className="flex items-center justify-between border-b border-[#4f4537]/30 pb-2 mb-2.5">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#f4be65] text-[18px]">verified</span>
            <h2 className="font-headline-sm text-sm text-[#e3e2e8]">Live Cryptographic Audit Trail</h2>
          </div>
          <span className="font-label-spatial text-[10px] text-[#bfcbac]">ED25519 CHAIN</span>
        </div>

        <div className="space-y-2 text-xs">
          {/* Feed Item 1 */}
          <div className="bg-[#1a1b20] rounded p-2.5 border border-[#4f4537]/20 hover:border-[#f4be65]/40 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab]" />
                <span className="font-label-spatial text-[10px] text-[#e3e2e8] font-semibold">
                  SIG-GATE-FAIL
                </span>
              </div>
              <span className="font-label-spatial text-[9px] text-[#9c8f7e]">14:28:02 UTC</span>
            </div>
            <p className="text-[#d3c4b2] mb-1 text-[11px]">
              Fatigue limit breach in Solenoid #B-422 signed by Automated Test Bench #3.
            </p>
            <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#9c8f7e] bg-[#0d0e13] px-2 py-1 rounded">
              <span className="truncate max-w-[180px]">ed25519:7c9e801b...f9a4</span>
              <span className="text-[#bfcbac]">VERIFIED</span>
            </div>
          </div>

          {/* Feed Item 2 */}
          <div className="bg-[#1a1b20] rounded p-2.5 border border-[#4f4537]/20 hover:border-[#f4be65]/40 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#f4be65]" />
                <span className="font-label-spatial text-[10px] text-[#e3e2e8] font-semibold">
                  POLICY-DOCKET-GEN
                </span>
              </div>
              <span className="font-label-spatial text-[9px] text-[#9c8f7e]">14:12:44 UTC</span>
            </div>
            <p className="text-[#d3c4b2] mb-1 text-[11px]">
              Waiver Docket #782 drafted for DARPA-STTR §4.2 safety threshold deviation.
            </p>
            <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#9c8f7e] bg-[#0d0e13] px-2 py-1 rounded">
              <span className="truncate max-w-[180px]">ed25519:3b04a91c...18d2</span>
              <span className="text-[#bfcbac]">VERIFIED</span>
            </div>
          </div>

          {/* Feed Item 3 */}
          <div className="bg-[#1a1b20] rounded p-2.5 border border-[#4f4537]/20 hover:border-[#f4be65]/40 transition-colors">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac]" />
                <span className="font-label-spatial text-[10px] text-[#e3e2e8] font-semibold">
                  CAL-KEY-INJECT
                </span>
              </div>
              <span className="font-label-spatial text-[9px] text-[#9c8f7e]">13:58:19 UTC</span>
            </div>
            <p className="text-[#d3c4b2] mb-1 text-[11px]">
              Protocol B-2 firmware cryptographic checksum validated on master orchestrator.
            </p>
            <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#9c8f7e] bg-[#0d0e13] px-2 py-1 rounded">
              <span className="truncate max-w-[180px]">ed25519:a519dd3e...940c</span>
              <span className="text-[#bfcbac]">VERIFIED</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

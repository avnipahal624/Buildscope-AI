import React, { useState } from 'react';
import { DEPENDENCY_NODES } from '../data/mockData';
import { DependencyNode, AppScreen } from '../types';

interface DependencyGraphViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const DependencyGraphView: React.FC<DependencyGraphViewProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'topology' | 'ledger' | 'inspector'>('topology');
  const [filter, setFilter] = useState<string>('All');
  const [nodes, setNodes] = useState<DependencyNode[]>(DEPENDENCY_NODES);
  const [isOverrideAuthorized, setIsOverrideAuthorized] = useState(false);
  const [selectedNode, setSelectedNode] = useState<DependencyNode | null>(DEPENDENCY_NODES[3]); // Solenoid by default

  const filteredNodes = nodes.filter((n) => {
    if (filter === 'All') return true;
    if (filter === 'Verified') return n.status === 'VERIFIED';
    if (filter === 'Evidence Found') return n.status === 'EVIDENCE FOUND';
    if (filter === 'Blocked') return n.status.includes('BLOCKED');
    return true;
  });

  const handleAuthorizeOverride = () => {
    setIsOverrideAuthorized(true);
    setNodes((prev) =>
      prev.map((item) =>
        item.id === 'dep-4'
          ? {
              ...item,
              status: 'VERIFIED',
              statusNote: 'FALLBACK B-2 ARMED',
              isBlocked: false,
              description: 'DARPA STTR waiver authorized via Protocol B-2 Dual-Burrow Micro-Auger override.'
            }
          : item
      )
    );
    onShowToast('Protocol B-2 Override Authorized: Flight clearance restored');
  };

  return (
    <main className="pt-20 px-3 sm:px-6 space-y-5 max-w-lg mx-auto pb-32">
      {/* Context Strip */}
      <div className="flex items-center justify-between text-[#9c8f7e] text-xs font-label-spatial border-b border-[#4f4537]/30 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[#d3c4b2]">ACTIVE SPEC:</span>
          <span className="text-[#d1c5ad] font-semibold">Drone Seedling v2.4</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-[#f4be65]">
          <span className="material-symbols-outlined text-[14px]">hub</span>
          <span>GRAPH INFERENCE ACTIVE</span>
        </div>
      </div>

      {/* Editorial Header Section */}
      <section className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-[1px] bg-[#f4be65]" />
          <span className="font-label-spatial text-[10px] text-[#f4be65] tracking-widest uppercase">
            System Validation Protocol
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-[24px] sm:text-[28px] text-[#d1c5ad] font-medium tracking-tight">
          Technical Feasibility & Dependency Graph
        </h1>
        <p className="font-body-sm text-xs text-[#d3c4b2] leading-relaxed">
          Empirical verification registry for sensor payloads, edge compute pipelines, and hardware actuation chains.
        </p>
      </section>

      {/* Overview KPI Bento Grid */}
      <section className="grid grid-cols-4 gap-1.5 scribe-box bg-[#1a1b20]/80 p-3 rounded shadow-sm">
        <div className="flex flex-col border-r border-[#4f4537]/30 pr-1">
          <span className="font-label-spatial text-[9px] text-[#9c8f7e] uppercase">Total</span>
          <span className="font-headline-md text-lg text-[#e3e2e8] font-semibold">12</span>
          <span className="text-[9px] text-[#9c8f7e]">Nodes Pinned</span>
        </div>

        <div className="flex flex-col border-r border-[#4f4537]/30 px-1">
          <span className="font-label-spatial text-[9px] text-[#bfcbac] uppercase flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac]" /> 08
          </span>
          <span className="font-headline-md text-lg text-[#f4be65] font-semibold">
            {isOverrideAuthorized ? '09' : '08'}
          </span>
          <span className="text-[9px] text-[#bfcbac]">Hardware-pass</span>
        </div>

        <div className="flex flex-col border-r border-[#4f4537]/30 px-1">
          <span className="font-label-spatial text-[9px] text-[#8ea6c4] uppercase flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8ea6c4]" /> 03
          </span>
          <span className="font-headline-md text-lg text-[#d1c5ad] font-semibold">Found</span>
          <span className="text-[9px] text-[#9c8f7e]">Lab Evidence</span>
        </div>

        <div className="flex flex-col pl-1">
          <span className="font-label-spatial text-[9px] text-[#ffb4ab] uppercase flex items-center gap-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-pulse" />{' '}
            {isOverrideAuthorized ? '00' : '01'}
          </span>
          <span
            className={`font-headline-md text-lg font-semibold ${
              isOverrideAuthorized ? 'text-[#bfcbac]' : 'text-[#ffb4ab]'
            }`}
          >
            {isOverrideAuthorized ? 'Clear' : 'Gated'}
          </span>
          <span className="text-[9px] text-[#ffb4ab]/80">Critical Path</span>
        </div>
      </section>

      {/* Tri-state View Switcher */}
      <div className="grid grid-cols-3 p-0.5 rounded bg-[#1a1b20] border border-[#4f4537]/40 text-xs font-label-tag">
        <button
          type="button"
          onClick={() => setActiveTab('topology')}
          className={`py-1.5 text-center rounded flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'topology'
              ? 'bg-[#292a2f] text-[#f4be65] font-medium shadow-sm'
              : 'text-[#d3c4b2] hover:text-[#e3e2e8]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">account_tree</span>
          <span>Topology</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('ledger')}
          className={`py-1.5 text-center rounded flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'ledger'
              ? 'bg-[#292a2f] text-[#f4be65] font-medium shadow-sm'
              : 'text-[#d3c4b2] hover:text-[#e3e2e8]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">receipt_long</span>
          <span>Ledger</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('inspector')}
          className={`py-1.5 text-center rounded flex items-center justify-center gap-1 cursor-pointer ${
            activeTab === 'inspector'
              ? 'bg-[#292a2f] text-[#f4be65] font-medium shadow-sm'
              : 'text-[#d3c4b2] hover:text-[#e3e2e8]'
          }`}
        >
          <span className="material-symbols-outlined text-[15px]">search_insights</span>
          <span>Inspector</span>
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-xs font-label-tag">
        {['All', 'Verified', 'Evidence Found', 'Blocked'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer transition-colors ${
              filter === f
                ? 'bg-[#d6a34d] text-[#573a00] font-semibold'
                : 'bg-[#1e1f24] border border-[#4f4537]/40 text-[#d3c4b2] hover:border-[#f4be65]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* HARD GATE ALERT PLATE */}
      {!isOverrideAuthorized && (
        <section className="relative cream-paper-texture text-[#222328] p-4 rounded shadow-xl border-l-4 border-[#ffb4ab] overflow-hidden">
          <div className="absolute -top-1.5 right-6 w-12 h-3.5 notebook-washi-tape rotate-[-2deg] opacity-75 pointer-events-none" />
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#ffb4ab] text-[20px] shrink-0 mt-0.5">
              report_problem
            </span>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-label-spatial text-[10px] font-bold text-[#79543A] tracking-wider uppercase">
                  HARD GATE WARNING · AUTOSYS LAB #71-B
                </span>
                <span className="font-label-spatial text-[9px] px-1.5 py-0.2 bg-[#79543A]/10 text-[#79543A] font-semibold border border-[#79543A]/25 rounded">
                  CRITICAL
                </span>
              </div>
              <p className="font-annotation text-xs leading-snug text-[#222328] font-medium">
                High-pressure pneumatic dart actuation solenoid is blocked pending 4.0 MPa cyclic fatigue pressure burst certification. Fallback protocol B-2 armed.
              </p>
              <div className="pt-1 flex items-center gap-2 text-[10px] font-label-spatial text-[#79543A]">
                <span>BURST REGISTRY: #PR-8820-X</span>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onShowToast('Retrieving Laboratory Chamber Live Telemetry feed...')}
                  className="underline decoration-dotted cursor-pointer"
                >
                  View Laboratory Chamber Feed
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dependency Cards Stream */}
      <section className="space-y-3.5">
        {filteredNodes.map((node) => {
          const isGated = node.isBlocked && !isOverrideAuthorized;
          return (
            <article
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`relative rounded p-3.5 border transition-all cursor-pointer ${
                isGated
                  ? 'bg-[#292a2f] border-[#ffb4ab]/60 shadow-[0_6px_20px_-2px_rgba(147,0,10,0.3)]'
                  : selectedNode?.id === node.id
                  ? 'bg-[#292a2f] border-[#f4be65] ring-1 ring-[#f4be65]/40'
                  : 'bg-[#1e1f24] border-[#4f4537]/40 hover:border-[#f4be65]/40'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <span className="font-label-spatial text-[10px] text-[#9c8f7e] uppercase tracking-wider block">
                    {node.code}
                  </span>
                  <h2 className="font-headline-sm text-sm text-[#eee1c8] font-medium tracking-tight mt-0.5">
                    {node.title}
                  </h2>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded font-label-spatial text-[10px] font-semibold shrink-0 ${
                    isGated
                      ? 'bg-[#93000a]/40 border border-[#ffb4ab] text-[#ffb4ab]'
                      : node.status === 'VERIFIED'
                      ? 'bg-[#a4b092]/20 border border-[#bfcbac]/40 text-[#bfcbac]'
                      : 'bg-[#d6a34d]/20 border border-[#f4be65]/40 text-[#f4be65]'
                  }`}
                >
                  {isGated && <span className="w-1.5 h-1.5 rounded-full bg-[#ffb4ab] animate-ping" />}
                  {node.status}
                </span>
              </div>

              {/* Inset */}
              <div className="bg-[#0d0e13]/80 rounded p-2 border border-[#4f4537]/30 font-label-spatial text-xs space-y-1 mb-2">
                <div className="flex items-center justify-between text-[11px] text-[#f4be65]">
                  <span>{node.specMetricKey}</span>
                  <span className={isGated ? 'text-[#ffb4ab]' : 'text-[#bfcbac]'}>
                    {node.specMetricVal}
                  </span>
                </div>
                <p className="text-[11px] text-[#d3c4b2] leading-normal">{node.description}</p>
                {node.fallbackNote && (
                  <div className="pt-1 border-t border-[#4f4537]/30 flex items-center gap-1 text-[#f4be65] text-[10px]">
                    <span className="material-symbols-outlined text-[12px]">alt_route</span>
                    <span>{node.fallbackNote}</span>
                  </div>
                )}
              </div>

              {/* Document link */}
              <div className="flex items-center justify-between pt-1 border-t border-[#4f4537]/20 text-[10px] font-label-spatial text-[#9c8f7e]">
                <span className="truncate">{node.docCitation}</span>
                <span className="material-symbols-outlined text-[14px] text-[#f4be65]">
                  arrow_forward
                </span>
              </div>
            </article>
          );
        })}
      </section>

      {/* ACTIVE INSPECTOR CONTEXT (Root cause & Override) */}
      <section className="mt-4 pt-4 border-t border-[#4f4537]/40">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ffb4ab] animate-pulse" />
            <span className="font-label-spatial text-xs text-[#f4be65] tracking-wider uppercase font-semibold">
              Active Inspector Context: {selectedNode?.title}
            </span>
          </div>
          <span className="font-label-spatial text-[10px] text-[#9c8f7e]">HASH: 0x9b7...2f0</span>
        </div>

        <div className="bg-[#292a2f] border border-[#4f4537]/60 rounded-lg p-4 shadow-xl space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <span className="font-label-tag text-xs text-[#ffb4ab] uppercase tracking-wider font-semibold">
                Deficit Root-Cause Analysis
              </span>
              <h2 className="font-headline-sm text-base text-[#e3e2e8] mt-0.5">
                3.2 MPa Pneumatic Solenoid
              </h2>
              <p className="font-label-spatial text-[11px] text-[#9c8f7e]">
                Folio Spec ID: ACT-SOL-882-P
              </p>
            </div>
            <span className="material-symbols-outlined text-[#f4be65]">biotech</span>
          </div>

          <div className="p-3 rounded bg-[#0d0e13] border border-[#4f4537]/30 font-label-spatial text-xs">
            <div className="text-[10px] text-[#9c8f7e] mb-1 uppercase tracking-wider">
              Acoustic & Pressure Limits Failure Log:
            </div>
            <p className="text-[#e3e2e8] text-[11px] leading-relaxed">
              During thermal shock cycling (-10°C to +35°C), high-frequency acoustic flutter triggered valve seat relaxation, limiting continuous chamber sealing to{' '}
              <span className="text-[#ffb4ab] font-bold">3.10 MPa</span> tested, failing DARPA STTR §4.2 mandate of{' '}
              <span className="text-[#f4be65] font-bold">4.00 MPa</span>.
            </p>
          </div>

          {/* Telemetry Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-label-spatial text-[10px]">
            <div className="p-2 rounded bg-[#1e1f24] border border-[#4f4537]/20">
              <span className="text-[#9c8f7e] block">PULSE CURRENT</span>
              <span className="text-[#e3e2e8] font-bold">12V @ 4.2A</span>
            </div>
            <div className="p-2 rounded bg-[#1e1f24] border border-[#4f4537]/20">
              <span className="text-[#9c8f7e] block">PEAK STROKE BUS</span>
              <span className="text-[#e3e2e8] font-bold">24V Transient</span>
            </div>
            <div className="p-2 rounded bg-[#1e1f24] border border-[#4f4537]/20">
              <span className="text-[#9c8f7e] block">CYCLE TIME</span>
              <span className="text-[#e3e2e8] font-bold">350 ms</span>
            </div>
            <div className="p-2 rounded bg-[#1e1f24] border border-[#4f4537]/20">
              <span className="text-[#9c8f7e] block">CHAMBER VOL</span>
              <span className="text-[#e3e2e8] font-bold">18.4 cm³</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={handleAuthorizeOverride}
              className={`w-full py-3 px-4 rounded font-headline-sm text-sm font-semibold text-center shadow flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] ${
                isOverrideAuthorized
                  ? 'bg-[#a4b092] text-[#151e0a]'
                  : 'bg-[#d6a34d] text-[#281900] hover:bg-[#f4bd65]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isOverrideAuthorized ? 'check_circle' : 'electric_bolt'}
              </span>
              <span>
                {isOverrideAuthorized
                  ? 'Protocol B-2 Override Sealed in Ledger'
                  : 'Authorize Protocol B-2 Override'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onShowToast('Telemetry proof hash verified via ed25519 signature stream')}
              className="w-full py-2 px-4 rounded bg-[#1e1f24] border border-[#4f4537]/40 text-[#d3c4b2] text-xs hover:border-[#f4be65] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">lock_open</span>
              <span>Inspect Proof Hash & Raw Telemetry Stream</span>
            </button>
          </div>
        </div>
      </section>

      {/* Action Buttons Cluster */}
      <section className="space-y-2 pt-2">
        <button
          type="button"
          onClick={() => onShowToast('Register Dependency Modal opened')}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#d6a34d] text-[#281900] font-label-tag text-xs font-semibold rounded hover:bg-[#f4bd65] active:scale-[0.98] transition-all shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>+ Register Empirical Dependency</span>
        </button>

        <button
          type="button"
          onClick={() => onShowToast('Exporting Dependency Verification Matrix (CSV / Markdown)...')}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-[#1e1f24] border border-[#4f4537]/50 text-[#d1c5ad] hover:border-[#f4be65] text-xs font-medium rounded active:scale-[0.98] transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px] text-[#9c8f7e]">file_download</span>
          <span>Export Dependency Verification Matrix (CSV / MD)</span>
        </button>
      </section>
    </main>
  );
};

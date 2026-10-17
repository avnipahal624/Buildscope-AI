import React, { useState } from 'react';

export interface InspectorContent {
  title: string;
  description: string;
  category: string;
  metric?: string;
  accentColor?: string;
  citationDoc?: string;
  proofHash?: string;
}

interface InspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: InspectorContent | null;
  onAttach?: (note: string) => void;
}

export const InspectorModal: React.FC<InspectorModalProps> = ({
  isOpen,
  onClose,
  content,
  onAttach
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'evidence' | 'deps' | 'attach'>('summary');
  const [annotation, setAnnotation] = useState('');

  if (!isOpen || !content) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end justify-center transition-opacity duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#1a1b20] border-t border-[#f4be65]/40 rounded-t-2xl max-h-[85vh] overflow-y-auto no-scrollbar p-4 space-y-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Drag Handle */}
        <div
          className="w-12 h-1 bg-[#4f4537]/80 rounded-full mx-auto -mt-1 mb-2 cursor-pointer hover:bg-[#f4be65] transition-colors"
          onClick={onClose}
        />

        {/* Drawer Header */}
        <div className="flex items-start justify-between border-b border-[#4f4537]/30 pb-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded text-[10px] font-label-spatial bg-[#d6a34d]/20 text-[#f4be65] border border-[#d6a34d]/40"
                style={{ borderColor: content.accentColor || '#d6a34d' }}
              >
                {content.category}
              </span>
              <span className="text-[10px] font-label-spatial text-[#bfcbac]">
                {content.metric || 'Verified Telemetry'}
              </span>
            </div>
            <h3 className="font-headline-sm text-base text-[#e3e2e8] font-bold">
              {content.title}
            </h3>
          </div>
          <button
            type="button"
            className="w-7 h-7 rounded-full bg-[#1e1f24] flex items-center justify-center text-[#9c8f7e] hover:text-[#e3e2e8] active:scale-90 transition-all cursor-pointer"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Drawer Tabs */}
        <div className="flex border-b border-[#4f4537]/30 text-xs font-label-tag">
          <button
            type="button"
            className={`flex-1 py-1.5 border-b-2 text-center font-bold cursor-pointer transition-colors ${
              activeTab === 'summary'
                ? 'border-[#f4be65] text-[#f4be65]'
                : 'border-transparent text-[#9c8f7e] hover:text-[#e3e2e8]'
            }`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 border-b-2 text-center font-bold cursor-pointer transition-colors ${
              activeTab === 'evidence'
                ? 'border-[#f4be65] text-[#f4be65]'
                : 'border-transparent text-[#9c8f7e] hover:text-[#e3e2e8]'
            }`}
            onClick={() => setActiveTab('evidence')}
          >
            Evidence Chain
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 border-b-2 text-center font-bold cursor-pointer transition-colors ${
              activeTab === 'deps'
                ? 'border-[#f4be65] text-[#f4be65]'
                : 'border-transparent text-[#9c8f7e] hover:text-[#e3e2e8]'
            }`}
            onClick={() => setActiveTab('deps')}
          >
            Dependencies
          </button>
          <button
            type="button"
            className={`flex-1 py-1.5 border-b-2 text-center font-bold cursor-pointer transition-colors ${
              activeTab === 'attach'
                ? 'border-[#f4be65] text-[#f4be65]'
                : 'border-transparent text-[#9c8f7e] hover:text-[#e3e2e8]'
            }`}
            onClick={() => setActiveTab('attach')}
          >
            Attach
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'summary' && (
          <div className="space-y-3 text-body-sm text-[#d3c4b2]">
            <p className="leading-relaxed text-xs">{content.description}</p>

            <div className="bg-[#1e1f24] p-3 rounded-lg border border-[#4f4537]/30 space-y-2">
              <span className="text-[10px] font-label-spatial text-[#f4be65] uppercase tracking-wide block">
                Validation Proof & Ingestion
              </span>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#e3e2e8]">Data Trust Score</span>
                <span className="font-label-spatial text-[#bfcbac] font-bold">
                  A+ (Triple-Peer Checked)
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#e3e2e8]">Licensing Compliance</span>
                <span className="font-label-spatial text-[#f4be65] font-bold">
                  Permissive / Commercial
                </span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-[#4f4537]/20">
                <span className="text-[#e3e2e8]">Citation Proof Hash</span>
                <span className="font-label-spatial text-[#d1c5ad] text-[10px]">
                  {content.proofHash || '0x9F4C2...E89B1'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-3 text-body-sm text-[#d3c4b2]">
            <div className="p-3 bg-[#1e1f24] rounded-lg border border-[#4f4537]/30 space-y-2">
              <span className="text-[10px] font-label-spatial text-[#bfcbac] uppercase block font-semibold">
                Peer-Reviewed Provenance
              </span>
              <p className="text-xs text-[#e3e2e8] leading-relaxed">
                Empirical validation grounded in DARPA STTR §4.2, ArXiv:2403.0112 (Canopy LiDAR Dual-Frequency Profiling), and Olympic Peninsula field telemetry runs.
              </p>
              <div className="flex items-center justify-between text-[11px] font-label-spatial text-[#9c8f7e] pt-1">
                <span>Verification State: Sealed</span>
                <span className="text-[#bfcbac]">Confidence 98.2%</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'deps' && (
          <div className="space-y-3 text-body-sm text-[#d3c4b2]">
            <div className="p-3 bg-[#1e1f24] rounded-lg border border-[#4f4537]/30 space-y-2">
              <span className="text-[10px] font-label-spatial text-[#f4be65] uppercase block font-semibold">
                Direct Subsystem Bindings
              </span>
              <div className="flex items-center justify-between text-xs">
                <span>Jetson Orin Nano TensorRT 8.5</span>
                <span className="text-[#bfcbac] font-mono text-[11px]">42 FPS RT</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>MAVLink V2 UART Ring Buffer</span>
                <span className="text-[#bfcbac] font-mono text-[11px]">100% Sync</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span>3.2 MPa Solenoid Actuator</span>
                <span className="text-[#ffb4ab] font-mono text-[11px]">Gated (-20%)</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'attach' && (
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-[11px] font-label-spatial text-[#9c8f7e]">
                Add Project Annotation / Lab Note
              </label>
              <input
                type="text"
                value={annotation}
                onChange={(e) => setAnnotation(e.target.value)}
                placeholder="e.g. Requires mounting bracket modification for rain..."
                className="w-full bg-[#1e1f24] border border-[#4f4537]/40 rounded px-3 py-2 text-xs text-[#e3e2e8] placeholder:text-[#9c8f7e]/60 focus:outline-none focus:border-[#f4be65]"
              />
            </div>
          </div>
        )}

        {/* Quick Attach Note */}
        {activeTab !== 'attach' && (
          <div className="space-y-1">
            <label className="text-[11px] font-label-spatial text-[#9c8f7e]">
              Quick Annotation
            </label>
            <input
              type="text"
              value={annotation}
              onChange={(e) => setAnnotation(e.target.value)}
              placeholder="e.g. Verified for cold weather downwash..."
              className="w-full bg-[#1e1f24] border border-[#4f4537]/40 rounded px-3 py-1.5 text-xs text-[#e3e2e8] placeholder:text-[#9c8f7e]/60 focus:outline-none focus:border-[#f4be65]"
            />
          </div>
        )}

        {/* Bottom Drawer Action Buttons */}
        <div className="pt-2 flex gap-2">
          <button
            type="button"
            className="flex-1 py-2 rounded bg-[#d6a34d] text-[#281900] font-label-tag text-xs font-bold shadow-md hover:bg-[#f4bd65] active:scale-95 transition-all text-center cursor-pointer"
            onClick={() => {
              if (onAttach) onAttach(annotation);
              onClose();
            }}
          >
            Attach to Active Investigation
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded bg-[#1e1f24] text-[#d3c4b2] font-label-tag text-xs border border-[#4f4537]/30 hover:border-[#9c8f7e] transition-all cursor-pointer"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { AppScreen } from '../types';

interface CuratorProfileViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const CuratorProfileView: React.FC<CuratorProfileViewProps> = ({
  onNavigate,
  onShowToast
}) => {
  const [telemetryMoat, setTelemetryMoat] = useState(true);
  const [defaultRoute, setDefaultRoute] = useState<'discover' | '3d-core' | 'investigations'>('discover');
  const [detailDepth, setDetailDepth] = useState<'exec' | 'empirical'>('empirical');
  const [sessionKey, setSessionKey] = useState('0x8F4C2...E89B1');

  const copyKey = () => {
    navigator.clipboard?.writeText(sessionKey);
    onShowToast('Session Keypair 0x8F4C2...E89B1 copied to clipboard');
  };

  const regenerateKey = () => {
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const newK = `0x${randomHex}...E89B1`;
    setSessionKey(newK);
    onShowToast(`New Ed25519 keypair generated: ${newK}`);
  };

  return (
    <main className="pt-20 px-3 sm:px-6 md:px-8 max-w-6xl mx-auto space-y-5 pb-32 animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Identity & Keys */}
        <div className="lg:col-span-6 space-y-5">
          {/* Top Protocol Strip */}
          <section className="pt-1">
        <div className="flex items-center gap-1.5 text-[#f4be65] mb-1">
          <span className="material-symbols-outlined text-[16px]">token</span>
          <span className="font-label-spatial text-[10px] uppercase tracking-wider text-[#f4be65]">
            Curator Credential · Protocol v4.8
          </span>
        </div>
        <h1 className="font-headline-lg-mobile text-[24px] sm:text-[28px] text-[#e3e2e8] tracking-tight">
          Curator Profile & Security Settings
        </h1>
        <p className="font-body-sm text-xs text-[#d3c4b2] mt-1 leading-relaxed">
          Manage cryptographic identity keys, academic affiliations, telemetry privacy, and workspace defaults.
        </p>
      </section>

      {/* Curator Identity Card */}
      <section className="relative bg-[#292a2f] rounded-xl p-4 border border-[#4f4537]/40 shadow-lg overflow-hidden scribe-plate">
        <div className="absolute -top-3 right-6 w-12 h-6 bg-[#d6a34d]/20 border-b border-[#f4be65]/40 backdrop-blur-sm rotate-3 pointer-events-none" />
        <div className="flex items-start justify-between gap-3">
          {/* Monogram Frame */}
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-full bg-[#0d0e13] border-2 border-[#d6a34d]/60 flex items-center justify-center text-[#f4be65] shadow-lg">
              <span className="font-headline-sm text-lg tracking-wider font-semibold">AV</span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#1a1b20] border border-[#4f4537]/60 rounded-full p-0.5 text-[#bfcbac]">
              <span className="material-symbols-outlined text-[14px] fill-icon">verified</span>
            </div>
          </div>

          {/* Identity Metadata */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-label-spatial text-[10px] text-[#f4be65] bg-[#f4be65]/10 border border-[#f4be65]/20 px-1.5 py-0.5 rounded">
                #IND-001 · Cryptographically Pinned
              </span>
            </div>
            <h2 className="font-headline-md text-lg text-[#e3e2e8] mt-1 truncate">
              Dr. Aris Vandenberg
            </h2>
            <p className="font-body-sm text-xs text-[#d1c5ad] font-medium mt-0.5">
              Lead Autonomous Systems Curator · Spatial AI Fellow
            </p>
          </div>
        </div>

        {/* Institution Badge */}
        <div className="mt-3 pt-2 border-t border-[#4f4537]/30 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-[#d3c4b2]">
            <span className="material-symbols-outlined text-[16px] text-[#bfcbac] fill-icon">
              account_balance
            </span>
            <span className="text-[#e3e2e8] font-medium">Stanford University</span>
            <span className="text-[#9c8f7e]">·</span>
            <span className="text-[#bfcbac] font-label-spatial text-[11px]">
              Center for Spatial AI (Verified)
            </span>
          </div>
        </div>

        {/* Action */}
        <div className="mt-3 pt-1 flex justify-end">
          <button
            type="button"
            onClick={() => onShowToast('Profile editing unlocked for Dr. Aris Vandenberg')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#4f4537]/60 text-[#e3e2e8] hover:text-[#f4be65] hover:border-[#f4be65] text-xs font-label-tag active:scale-95 transition-all bg-[#1a1b20]/60 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">edit_note</span>
            <span>Edit Profile Credentials</span>
          </button>
        </div>
      </section>

      {/* Section 1: Cryptographic Keys & Local Vault */}
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px] text-[#f4be65]">encrypted</span>
            <h3 className="font-headline-sm text-sm text-[#e3e2e8]">
              Cryptographic Keys & Local Vault
            </h3>
          </div>
          <span className="font-label-spatial text-[10px] text-[#9c8f7e]">SEC-LEVEL 4</span>
        </div>

        <div className="bg-[#1e1f24] rounded-xl p-4 border border-[#4f4537]/30 shadow-md space-y-3">
          {/* Keypair Card */}
          <div className="bg-[#1a1b20] rounded p-3 border border-[#4f4537]/40">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#f4be65]">key</span>
                <span className="font-body-sm text-xs font-medium text-[#e3e2e8]">
                  Local Session Keypair (Ed25519)
                </span>
              </div>
              <span className="font-label-spatial text-[9px] text-[#bfcbac] bg-[#bfcbac]/10 px-1.5 py-0.5 rounded border border-[#bfcbac]/30">
                CLIENT-TIED
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between bg-[#0d0e13] px-3 py-2 rounded font-label-spatial text-xs text-[#f4be65] border border-[#4f4537]/20">
              <span className="truncate tracking-wider">{sessionKey}</span>
              <button
                type="button"
                onClick={copyKey}
                className="text-[#9c8f7e] hover:text-[#f4be65] ml-2 active:scale-90 transition-transform cursor-pointer"
                title="Copy Key"
              >
                <span className="material-symbols-outlined text-[16px]">content_copy</span>
              </button>
            </div>

            <div className="mt-2 flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={regenerateKey}
                className="px-2.5 py-1 text-xs font-label-tag text-[#d3c4b2] hover:text-[#f4be65] border border-[#4f4537]/40 rounded bg-[#1e1f24] active:scale-95 transition-all cursor-pointer"
              >
                Regenerate
              </button>
              <button
                type="button"
                onClick={() => onShowToast('Exporting ed25519 private/public keypair block...')}
                className="px-2.5 py-1 text-xs font-label-tag text-[#281900] bg-[#d6a34d] hover:bg-[#f4bd65] rounded active:scale-95 transition-all font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px]">file_download</span>
                Export
              </button>
            </div>
          </div>

          {/* Telemetry Moat Toggle */}
          <div className="pt-2 border-t border-[#4f4537]/20">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#bfcbac] fill-icon">
                    shield_with_heart
                  </span>
                  <span className="font-body-sm text-xs font-medium text-[#e3e2e8]">
                    Zero-Knowledge Telemetry Moat
                  </span>
                </div>
                <p className="font-body-sm text-[11px] text-[#9c8f7e] leading-relaxed">
                  All research drafts, competitor notes, and simulation telemetry remain client-side encrypted until explicitly published to a Passport Folio.
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                onClick={() => {
                  setTelemetryMoat(!telemetryMoat);
                  onShowToast(
                    !telemetryMoat
                      ? 'Zero-Knowledge Telemetry Moat Enabled'
                      : 'Zero-Knowledge Telemetry Moat Paused'
                  );
                }}
                className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 mt-1 ${
                  telemetryMoat ? 'bg-[#d6a34d]' : 'bg-[#34343a]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-[#121318] absolute top-0.5 transition-transform ${
                    telemetryMoat ? 'left-5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>

    {/* Right Column: Defaults, Quotas & Session */}
    <div className="lg:col-span-6 space-y-5">
      {/* Section 2: Workspace Defaults & Routing */}
      <section className="space-y-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#f4be65]">tune</span>
          <h3 className="font-headline-sm text-sm text-[#e3e2e8]">
            Workspace Defaults & Routing
          </h3>
        </div>

        <div className="bg-[#1e1f24] rounded-xl p-4 border border-[#4f4537]/30 shadow-md space-y-3">
          <div>
            <label className="block font-label-spatial text-[10px] text-[#9c8f7e] mb-2 uppercase">
              DEFAULT LANDING ROUTE
            </label>
            <div className="space-y-2 text-xs">
              <label
                onClick={() => setDefaultRoute('discover')}
                className={`flex items-center justify-between p-2.5 rounded border cursor-pointer transition-all ${
                  defaultRoute === 'discover'
                    ? 'bg-[#1a1b20] border-[#f4be65]/60'
                    : 'bg-[#1a1b20]/60 border-[#4f4537]/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="default_route"
                    checked={defaultRoute === 'discover'}
                    onChange={() => setDefaultRoute('discover')}
                    className="text-[#d6a34d] focus:ring-0"
                  />
                  <span className="text-[#e3e2e8] font-medium">Pinterest Discover Feed</span>
                </div>
                <span className="font-label-spatial text-[10px] text-[#f4be65]">/discover</span>
              </label>

              <label
                onClick={() => setDefaultRoute('3d-core')}
                className={`flex items-center justify-between p-2.5 rounded border cursor-pointer transition-all ${
                  defaultRoute === '3d-core'
                    ? 'bg-[#1a1b20] border-[#f4be65]/60'
                    : 'bg-[#1a1b20]/60 border-[#4f4537]/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="default_route"
                    checked={defaultRoute === '3d-core'}
                    onChange={() => setDefaultRoute('3d-core')}
                    className="text-[#d6a34d] focus:ring-0"
                  />
                  <span className="text-[#e3e2e8]">3D Spatial Core</span>
                </div>
                <span className="font-label-spatial text-[10px] text-[#9c8f7e]">/engine</span>
              </label>

              <label
                onClick={() => setDefaultRoute('investigations')}
                className={`flex items-center justify-between p-2.5 rounded border cursor-pointer transition-all ${
                  defaultRoute === 'investigations'
                    ? 'bg-[#1a1b20] border-[#f4be65]/60'
                    : 'bg-[#1a1b20]/60 border-[#4f4537]/30'
                }`}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="default_route"
                    checked={defaultRoute === 'investigations'}
                    onChange={() => setDefaultRoute('investigations')}
                    className="text-[#d6a34d] focus:ring-0"
                  />
                  <span className="text-[#e3e2e8]">Active Folio Directory</span>
                </div>
                <span className="font-label-spatial text-[10px] text-[#9c8f7e]">/investigations</span>
              </label>
            </div>
          </div>

          {/* Theme Surface */}
          <div className="pt-2 border-t border-[#4f4537]/20">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-label-spatial text-[10px] text-[#9c8f7e] uppercase">
                THEME SURFACE
              </span>
              <span className="font-label-tag text-[10px] text-[#f4be65]">Active</span>
            </div>
            <div className="p-2.5 rounded bg-[#1a1b20] border border-[#4f4537]/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded bg-[#0d0e13] border border-[#f4be65]/50" />
                <span className="text-[#e3e2e8] font-medium">Atelier Obsidian & Parchment</span>
              </div>
              <span className="text-[#9c8f7e] font-label-spatial text-[10px]">
                (Dark Charcoal default)
              </span>
            </div>
          </div>

          {/* Technical Detail Depth */}
          <div className="pt-2 border-t border-[#4f4537]/20">
            <label className="block font-label-spatial text-[10px] text-[#9c8f7e] mb-1.5 uppercase">
              TECHNICAL DETAIL DEPTH
            </label>
            <div className="grid grid-cols-2 p-1 bg-[#0d0e13] rounded border border-[#4f4537]/30 text-center text-xs font-label-tag">
              <button
                type="button"
                onClick={() => setDetailDepth('exec')}
                className={`py-1.5 rounded transition-colors cursor-pointer ${
                  detailDepth === 'exec'
                    ? 'bg-[#1e1f24] text-[#f4be65] font-semibold shadow-sm border border-[#4f4537]/40'
                    : 'text-[#d3c4b2]'
                }`}
              >
                Executive Summary
              </button>
              <button
                type="button"
                onClick={() => setDetailDepth('empirical')}
                className={`py-1.5 rounded transition-colors cursor-pointer ${
                  detailDepth === 'empirical'
                    ? 'bg-[#1e1f24] text-[#f4be65] font-semibold shadow-sm border border-[#4f4537]/40'
                    : 'text-[#d3c4b2]'
                }`}
              >
                Empirical Telemetry
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Connected Repositories & API Quotas */}
      <section className="space-y-2">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#f4be65]">lan</span>
          <h3 className="font-headline-sm text-sm text-[#e3e2e8]">
            Connected Repositories & Quotas
          </h3>
        </div>

        <div className="bg-[#1e1f24] rounded-xl p-4 border border-[#4f4537]/30 shadow-md space-y-2.5">
          <div className="flex items-center justify-between p-2.5 bg-[#1a1b20] rounded border border-[#4f4537]/30 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#9c8f7e]">terminal</span>
              <div>
                <p className="font-medium text-[#e3e2e8]">github.com/vandenberg-research</p>
                <p className="font-label-spatial text-[10px] text-[#bfcbac]">
                  Synced 2h ago · Read/Write Webhook
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onShowToast('GitHub webhook synchronization requested')}
              className="material-symbols-outlined text-[16px] text-[#9c8f7e] hover:text-[#f4be65] cursor-pointer"
            >
              sync
            </button>
          </div>

          <div className="flex items-center justify-between p-2.5 bg-[#1a1b20] rounded border border-[#4f4537]/30 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#9c8f7e]">auto_stories</span>
              <div>
                <p className="font-medium text-[#e3e2e8]">Hugging Face / ArXiv Telemetry</p>
                <p className="font-label-spatial text-[10px] text-[#d1c5ad]">
                  Direct Sync Permitted
                </p>
              </div>
            </div>
            <span className="text-[#bfcbac] material-symbols-outlined text-[18px] fill-icon">
              check_circle
            </span>
          </div>

          {/* Local Storage Quota Bar */}
          <div className="p-2.5 bg-[#1a1b20] rounded border border-[#4f4537]/30 space-y-1 text-xs">
            <div className="flex justify-between items-center font-label-spatial text-[11px]">
              <span className="text-[#e3e2e8]">Local Storage Quota</span>
              <span className="text-[#f4be65]">42.8 MB / 500 MB (8.5%)</span>
            </div>
            <div className="w-full bg-[#0d0e13] h-2 rounded-full overflow-hidden border border-[#4f4537]/20">
              <div className="bg-[#f4be65] h-full w-[8.5%] rounded-full" />
            </div>
            <p className="text-[10px] text-[#9c8f7e]">
              Parchment cache, Three.js shaders, local inference logs.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Session & Danger Zone */}
      <section className="space-y-2 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px] text-[#ffb4ab]">warning</span>
          <h3 className="font-headline-sm text-sm text-[#e3e2e8]">Session & Danger Zone</h3>
        </div>

        <div className="bg-[#1e1f24] rounded-xl p-4 border border-[#4f4537]/30 shadow-md space-y-2">
          <button
            type="button"
            onClick={() => onShowToast('Exported complete research ledger archive (JSON + Markdown)')}
            className="w-full py-2.5 px-3 rounded border border-[#4f4537]/60 text-[#e3e2e8] hover:text-[#f4be65] hover:border-[#f4be65] text-xs font-medium flex items-center justify-center gap-1.5 bg-[#1a1b20] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">archive</span>
            <span>Export Full Research Ledger (JSON + MD)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onShowToast('Session ended. Redirecting to Authentication Portal...');
              setTimeout(() => onNavigate('auth'), 600);
            }}
            className="w-full py-2.5 px-3 rounded border border-[#ffb4ab]/50 text-[#ffb4ab] hover:bg-[#93000a]/20 text-xs font-medium flex items-center justify-center gap-1.5 bg-[#0d0e13] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Sign Out of Researcher Session</span>
          </button>
        </div>
      </section>

      {/* Archival Sign-off */}
      <footer className="pt-2 text-center space-y-1">
        <p className="font-annotation text-xs italic text-[#d3c4b2]/70">
          Atelier Curatorial Protocol · End-to-end local integrity verification.
        </p>
        <p className="font-label-spatial text-[10px] text-[#9c8f7e]/60">
          BUILD_ID: 2025.03.04-SPATIAL-AI-STFD
        </p>
      </footer>
    </div>
  </div>
</main>
  );
};

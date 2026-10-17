import React from 'react';
import { RUBRIC_CRITERIA } from '../data/mockData';
import { AppScreen } from '../types';

interface RubricViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const RubricView: React.FC<RubricViewProps> = ({ onNavigate, onShowToast }) => {
  return (
    <main className="pt-20 px-3 sm:px-6 flex flex-col gap-5 max-w-lg mx-auto pb-32">
      {/* SUB-HEADER / FOLIO SPEC BANNER */}
      <div className="py-1 flex items-center justify-between border-b border-[#4f4537]/30">
        <button
          type="button"
          onClick={() => onNavigate('discover')}
          className="text-[#d3c4b2] text-xs font-label-spatial hover:text-[#f4be65] transition-colors cursor-pointer"
        >
          ← Folio #884-DS / Rubric
        </button>
        <div className="flex items-center gap-1 text-[#eee1c8]">
          <span className="material-symbols-outlined text-xs text-[#f4be65]">deployed_code</span>
          <span className="font-label-spatial text-xs tracking-tight">Drone Seedling v2.4</span>
        </div>
      </div>

      {/* Screen Title Segment */}
      <section className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-label-tag text-[#d6a34d] bg-[#d6a34d]/10 border border-[#d6a34d]/30 rounded">
            ARCHIVAL FOLIO · CRITERIA EVAL
          </span>
          <span className="text-label-spatial text-[#9c8f7e] text-[11px]">SPEC-REVISION 4.8</span>
        </div>
        <h1 className="font-headline-lg-mobile text-[26px] text-[#eee1c8] font-semibold tracking-tight">
          Competition Rubric & Acceptance Criteria
        </h1>
        <p className="font-body-sm text-xs text-[#d3c4b2]">
          Official criteria breakdown, evidence citations, and verifiable proof mapping for the Climate AI Innovation Track.
        </p>
      </section>

      {/* OVERALL SCORE CARD */}
      <section className="relative bg-[#1e1f24] p-4 rounded-lg scribe-plate border border-[#4f4537]/40 flex flex-col gap-3 overflow-hidden shadow-lg">
        <div className="flex items-start justify-between relative z-10">
          <div>
            <span className="text-label-spatial text-[#9c8f7e] text-[10px] block mb-0.5">
              AGGREGATE VERIFICATION MATRIX
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-headline-lg text-3xl sm:text-4xl text-[#f4be65] font-bold tracking-tight">
                28
              </span>
              <span className="font-headline-md text-xl text-[#9c8f7e] font-normal">/ 30</span>
              <span className="text-label-spatial text-[#d1c5ad] font-medium text-xs ml-1">
                CRITERIA POINTS
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-2.5 py-1 rounded bg-[#a4b092]/20 border border-[#bfcbac]/40 text-[#bfcbac] text-label-tag text-xs font-semibold">
              PASSED 93.3%
            </span>
            <span className="text-label-spatial text-[#9c8f7e] text-[10px] mt-1">
              EVAL BOARD SIGN-OFF
            </span>
          </div>
        </div>

        {/* Compliance Banner */}
        <div className="relative z-10 bg-[#292a2f]/90 border border-[#d6a34d]/30 px-3 py-2 rounded flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f4be65] text-base fill-icon">
              verified_user
            </span>
            <span className="text-label-spatial text-[#f4be65] text-[11px] font-semibold tracking-wider">
              93.3% RUBRIC COMPLIANCE · TIER 1 FINALIST BRACKET
            </span>
          </div>
          <span className="material-symbols-outlined text-[#9c8f7e] text-xs">travel_explore</span>
        </div>

        {/* Segmented Metric Gauge */}
        <div className="flex flex-col gap-1 relative z-10">
          <div className="w-full h-2 bg-[#1a1b20] rounded overflow-hidden flex">
            <div className="bg-[#f4be65] h-full w-[93.3%]" />
            <div className="bg-[#34343a] h-full w-[6.7%]" />
          </div>
          <div className="flex justify-between items-center text-label-spatial text-[10px] text-[#9c8f7e]">
            <span>MIN QUALIFYING THRESHOLD: 24.0 PTS</span>
            <span>MAX CAP: 30.0 PTS</span>
          </div>
        </div>
      </section>

      {/* OFFICIAL RUBRIC DETAILS PLATE (Cream Paper with Washi Tape) */}
      <section className="relative mt-2">
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-5 washi-tape border-t border-b border-[#f4be65]/20 shadow-sm z-20 -rotate-1 rounded-sm pointer-events-none" />
        <div className="cream-paper-texture text-[#222328] p-4 rounded-lg shadow-2xl relative z-10 border border-[#79543A]/30">
          <div className="flex items-center justify-between border-b border-[#79543A]/20 pb-2 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#79543A] text-sm">architecture</span>
              <span className="font-label-spatial text-[#79543A] font-semibold text-[10px] tracking-widest uppercase">
                OFFICIAL TRACK DECREE
              </span>
            </div>
            <span className="font-label-spatial text-[#79543A]/80 text-[10px]">DOC #CLIM-AI-24</span>
          </div>
          <h3 className="font-headline-sm text-base text-[#222328] font-serif leading-snug mb-2 font-bold">
            Climate AI Innovation Track 2024–2025
          </h3>
          <div className="flex flex-col gap-1.5 font-body-sm text-xs text-[#39432c]">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-[#222328] min-w-[90px] text-label-spatial text-[10px] uppercase">
                Judging Board:
              </span>
              <span>Global Autonomous Systems & Forestry Consortium</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-[#222328] min-w-[90px] text-label-spatial text-[10px] uppercase">
                Methodology:
              </span>
              <span>Empirical hardware demonstration & on-device telemetry proof</span>
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-[#79543A]/15 flex items-center justify-between text-[10px] font-label-spatial text-[#79543A]">
            <span>STATUS: JURY DELIBERATION ACTIVE</span>
            <span className="font-semibold text-[#222328]">VALIDATION SEAL: AFFIXED</span>
          </div>
        </div>
      </section>

      {/* CRITERIA BREAKDOWN CARDS */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-label-spatial text-[#9c8f7e] text-xs uppercase tracking-wider">
            CRITERIA AUDIT LEDGER (4)
          </span>
          <button
            type="button"
            onClick={() => onShowToast('All 18 empirical citations expanded')}
            className="text-label-tag text-[#f4be65] text-xs hover:underline cursor-pointer"
          >
            EXPAND ALL CITATIONS
          </button>
        </div>

        {RUBRIC_CRITERIA.map((criterion) => (
          <article
            key={criterion.id}
            className="bg-[#1e1f24] p-4 rounded-lg scribe-plate border border-[#4f4537]/40 flex flex-col gap-3 relative"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-label-spatial text-[#f4be65] text-[10px] font-bold">
                  {criterion.code} · {criterion.category}
                </span>
                <h2 className="font-headline-sm text-sm sm:text-base text-[#eee1c8] mt-0.5 font-semibold">
                  {criterion.title}
                </h2>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-headline-sm text-base text-[#f4be65] font-bold">
                  {criterion.score}{' '}
                  <span className="text-[#9c8f7e] text-xs font-normal">/ {criterion.maxScore}</span>
                </span>
                <span
                  className={`px-2 py-0.5 mt-0.5 text-label-tag text-[9px] rounded font-semibold ${
                    criterion.status === 'VERIFIED'
                      ? 'text-[#bfcbac] bg-[#bfcbac]/10 border border-[#bfcbac]/30'
                      : 'text-[#f4be65] bg-[#f4be65]/10 border border-[#f4be65]/30'
                  }`}
                >
                  {criterion.status}
                </span>
              </div>
            </div>

            {/* Rubric Wording Quote */}
            <div className="bg-[#1a1b20] p-2.5 rounded border-l-2 border-[#f4be65]/60 flex flex-col gap-1">
              <span className="text-label-spatial text-[#9c8f7e] text-[9px] uppercase">
                Official Rubric Wording
              </span>
              <p className="font-annotation text-xs italic text-[#d3c4b2]">
                {criterion.rubricQuote}
              </p>
            </div>

            {/* Empirical Evidence */}
            <div className="bg-[#292a2f]/60 p-2.5 rounded border border-[#4f4537]/30 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-label-spatial text-[#d1c5ad] text-[10px] font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f4be65]" />
                  {criterion.evidenceTitle}
                </span>
                <span className="text-label-spatial text-[#bfcbac] text-[9px]">
                  {criterion.evidenceTag}
                </span>
              </div>
              <p className="font-body-sm text-xs text-[#e3e2e8]">
                {criterion.evidenceDesc}
              </p>
              <div className="flex items-center justify-between pt-1 border-t border-[#4f4537]/20 mt-1">
                <div className="flex items-center gap-1 text-label-spatial text-[10px] text-[#f4be65]">
                  <span className="material-symbols-outlined text-xs">deployed_code</span>
                  <span>Linked Task: {criterion.linkedTask}</span>
                </div>
                <button
                  type="button"
                  onClick={() => onShowToast(`Inspecting trace for ${criterion.code}...`)}
                  className="text-label-spatial text-[10px] text-[#9c8f7e] hover:text-[#f4be65] transition-colors cursor-pointer"
                >
                  INSPECT TRACE →
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>

      {/* ACTION BUTTON CLUSTER */}
      <section className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={() => {
            onShowToast('Rubric verification appended to Passport Folio #884-DS');
            onNavigate('discover');
          }}
          className="w-full bg-[#d6a34d] text-[#281900] py-3.5 px-4 rounded font-body-md font-semibold text-center flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform border border-[#ffdead] cursor-pointer"
        >
          <span className="font-label-spatial font-bold text-xs tracking-wider uppercase">
            Add Rubric Verification to Passport →
          </span>
        </button>

        <button
          type="button"
          onClick={() => onShowToast('Generating official judging brief PDF...')}
          className="w-full bg-[#292a2f] border border-[#4f4537]/50 text-[#eee1c8] py-2.5 px-4 rounded font-body-md font-medium text-center flex items-center justify-center gap-2 hover:border-[#f4be65] transition-colors active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-base text-[#f4be65]">architecture</span>
          <span className="font-label-spatial text-xs tracking-wide">
            Download Official Judging Brief (PDF)
          </span>
        </button>

        <div className="text-center py-1">
          <span className="font-label-spatial text-[10px] text-[#9c8f7e]">
            HASH: 0x93FA·D702·884A · IMMUTABLE JURY LEDGER RECORD
          </span>
        </div>
      </section>
    </main>
  );
};

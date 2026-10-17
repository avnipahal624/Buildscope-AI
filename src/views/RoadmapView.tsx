import React, { useState } from 'react';
import { ROADMAP_TASKS } from '../data/mockData';
import { RoadmapTask, AppScreen } from '../types';

interface RoadmapViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({ onNavigate, onShowToast }) => {
  const [tasks, setTasks] = useState<RoadmapTask[]>(ROADMAP_TASKS);
  const [activePhase, setActivePhase] = useState<string>('Phase 2');
  const [showAppendModal, setShowAppendModal] = useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('AVIONICS');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const updated = !t.completed;
          onShowToast(updated ? `${t.code} marked verified` : `${t.code} marked in-progress`);
          return {
            ...t,
            completed: updated,
            status: updated ? 'VERIFIED' : 'ACTIVE'
          };
        }
        return t;
      })
    );
  };

  const handleAppendTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: RoadmapTask = {
      id: `task-${Date.now()}`,
      code: `TASK #${100 + tasks.length + 4}`,
      category: newTaskCategory,
      title: newTaskTitle,
      status: 'ACTIVE',
      progress: 25,
      completed: false,
      description: 'Scheduled empirical field milestone derived from current active Sprint 02 envelope.',
      duration: '4d (Estimated)',
      environment: 'Bench 02 / Simulation'
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setShowAppendModal(false);
    onShowToast('New Empirical Task appended to active roadmap');
  };

  return (
    <main className="pt-16 px-3 sm:px-6 max-w-md mx-auto pb-32">
      {/* Sub-Nav Breadcrumb */}
      <div className="pt-3 pb-2 flex items-center justify-between border-b border-[#4f4537]/20 mb-3">
        <button
          type="button"
          onClick={() => onNavigate('discover')}
          className="inline-flex items-center gap-1 font-label-spatial text-xs text-[#d1c5ad] hover:text-[#f4be65] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span>← Core Architecture</span>
        </button>
        <span className="font-label-spatial text-[11px] text-[#f4be65] bg-[#504836]/40 px-2 py-0.5 rounded border border-[#4f4537]/30">
          Drone Seedling v2.4
        </span>
      </div>

      {/* Editorial Header Block */}
      <section className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f4be65] animate-pulse" />
          <span className="font-label-spatial text-[11px] text-[#9c8f7e] uppercase tracking-wider">
            Empirical Vector · Field Execution
          </span>
        </div>
        <h1 className="text-[26px] font-headline-lg-mobile text-[#e3e2e8] font-semibold tracking-tight">
          Build Plan & Roadmap
        </h1>
        <p className="font-body-sm text-xs text-[#d3c4b2] mt-1 leading-snug">
          Empirical execution graph derived from verified hardware telemetry, risk matrix, and ROS2 stack validation.
        </p>
      </section>

      {/* SPRINT / MILESTONE PROGRESS OVERVIEW PLATE */}
      <section className="bg-[#292a2f] rounded p-4 scribe-plate border border-[#4f4537]/30 mb-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#f4be65]/20 pointer-events-none" />
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="font-label-spatial text-[11px] text-[#f4be65] font-semibold tracking-wide uppercase">
              Sprint 02 of 04 · Active
            </span>
            <h2 className="font-headline-sm text-base text-[#e3e2e8] mt-0.5">
              Substrate Impact & SLAM Tuning
            </h2>
          </div>
          <span className="font-label-spatial text-[11px] text-[#f4be65] bg-[#f4be65]/10 border border-[#f4be65]/30 px-2 py-0.5 rounded">
            Q3 2024
          </span>
        </div>

        {/* Completion meter */}
        <div className="mt-2 mb-3">
          <div className="flex justify-between items-center text-[11px] font-label-spatial mb-1.5">
            <span className="text-[#d1c5ad]">Completion: 68%</span>
            <span className="text-[#d3c4b2]">17 / 25 Milestones Verified</span>
          </div>
          <div className="w-full h-1.5 bg-[#0d0e13] rounded-full overflow-hidden border border-[#4f4537]/20">
            <div className="h-full bg-[#d6a34d] rounded-full" style={{ width: '68%' }} />
          </div>
        </div>

        {/* Telemetry Metric Badges Grid */}
        <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-[#4f4537]/30">
          <div className="bg-[#1a1b20]/80 p-2 rounded border border-[#4f4537]/20">
            <span className="block font-label-spatial text-[10px] text-[#9c8f7e] uppercase">
              Path Velocity
            </span>
            <span className="font-label-spatial text-xs text-[#f4be65] font-semibold">
              1.4x nom
            </span>
          </div>
          <div className="bg-[#1a1b20]/80 p-2 rounded border border-[#4f4537]/20">
            <span className="block font-label-spatial text-[10px] text-[#9c8f7e] uppercase">
              Active Blockers
            </span>
            <span className="font-label-spatial text-xs text-[#bfcbac] font-semibold">
              0 Critical
            </span>
          </div>
          <div className="bg-[#1a1b20]/80 p-2 rounded border border-[#4f4537]/20">
            <span className="block font-label-spatial text-[10px] text-[#9c8f7e] uppercase">
              Fallbacks
            </span>
            <span className="font-label-spatial text-xs text-[#d1c5ad] font-semibold">
              2/2 Ready
            </span>
          </div>
        </div>
      </section>

      {/* HORIZONTAL PHASE CHIPS */}
      <nav className="mb-4 overflow-x-auto no-scrollbar flex items-center gap-2 py-1">
        <button
          type="button"
          onClick={() => setActivePhase('All')}
          className={`shrink-0 px-3 py-1.5 rounded font-label-spatial text-[11px] border transition-colors cursor-pointer ${
            activePhase === 'All'
              ? 'bg-[#d6a34d] text-[#573a00] font-semibold border-[#d6a34d]'
              : 'bg-[#1e1f24] text-[#d3c4b2] border-[#4f4537]/40 hover:text-[#f4be65]'
          }`}
        >
          All Phases
        </button>

        <button
          type="button"
          onClick={() => setActivePhase('Phase 1')}
          className={`shrink-0 px-3 py-1.5 rounded font-label-spatial text-[11px] border transition-colors flex items-center gap-1.5 cursor-pointer ${
            activePhase === 'Phase 1'
              ? 'bg-[#bfcbac]/20 text-[#bfcbac] border-[#bfcbac]'
              : 'bg-[#292a2f] text-[#bfcbac] border-[#bfcbac]/30 hover:border-[#bfcbac]'
          }`}
        >
          <span className="material-symbols-outlined text-xs">check_circle</span>
          Phase 1: Edge SLAM
        </button>

        <button
          type="button"
          onClick={() => setActivePhase('Phase 2')}
          className={`shrink-0 px-3 py-1.5 rounded font-label-spatial text-[11px] font-semibold border flex items-center gap-1.5 cursor-pointer ${
            activePhase === 'Phase 2'
              ? 'bg-[#d6a34d] text-[#573a00] border-[#f4be65] shadow-sm'
              : 'bg-[#1e1f24] text-[#d3c4b2] border-[#4f4537]/30'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#121318] animate-ping" />
          Phase 2: Pneumatic Payload
        </button>

        <button
          type="button"
          onClick={() => setActivePhase('Phase 3')}
          className="shrink-0 px-3 py-1.5 rounded font-label-spatial text-[11px] text-[#9c8f7e] bg-[#1e1f24] border border-[#4f4537]/30 hover:text-[#d3c4b2] cursor-pointer"
        >
          Phase 3: Canopy Testing
        </button>

        <button
          type="button"
          onClick={() => setActivePhase('Phase 4')}
          className="shrink-0 px-3 py-1.5 rounded font-label-spatial text-[11px] text-[#9c8f7e] bg-[#1e1f24] border border-[#4f4537]/30 hover:text-[#d3c4b2] cursor-pointer"
        >
          Phase 4: Field Demo
        </button>
      </nav>

      {/* TACTILE FIELD NOTE / WASHI TAPE CALLOUT */}
      <div className="relative mb-5 pt-3">
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-28 h-4 washi-tape border-x border-[#f4be65]/30 z-10 rotate-[-1deg] rounded-sm pointer-events-none" />
        <div className="cream-paper-texture p-3.5 rounded shadow-lg border border-[#e2d5bd]">
          <div className="flex items-center gap-1.5 text-[#573a00] font-label-spatial text-[11px] font-bold tracking-wider mb-1">
            <span className="material-symbols-outlined text-sm text-[#79543A]">lock</span>
            <span>CRITICAL DEPENDENCY CHAIN · HARD GATE</span>
          </div>
          <p className="font-annotation text-xs leading-snug text-[#222328]">
            “Notice: Phase 2 pneumatic dart payload deployment is hard-gated on lab pressure vessel certification (AutoSys High-Bar Lab #71-B, target 4.0 MPa proof testing).”
          </p>
        </div>
      </div>

      {/* TASK & MILESTONE SEQUENCE CARDS */}
      <section className="space-y-3.5">
        {tasks.map((task) => (
          <article
            key={task.id}
            className={`rounded p-3.5 scribe-plate border relative ${
              task.isCritical
                ? 'bg-[#292a2f] border-l-4 border-l-[#d6a34d] border-t border-r border-b border-[#4f4537]/40'
                : 'bg-[#1e1f24] border-[#4f4537]/30'
            }`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mt-1 h-4 w-4 rounded-sm bg-[#1e1f24] border-[#9c8f7e] text-[#d6a34d] focus:ring-0 cursor-pointer"
                />
                <div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-label-spatial text-[10px] text-[#9c8f7e] uppercase block">
                      {task.code} {task.category && `· ${task.category}`}
                    </span>
                    {task.isCritical && (
                      <span className="font-label-spatial text-[9px] bg-[#93000a]/40 text-[#ffb4ab] px-1.5 py-0.2 rounded border border-[#ffb4ab]/30 uppercase tracking-wider">
                        P0 · CRITICAL PATH
                      </span>
                    )}
                  </div>
                  <h3 className="font-headline-sm text-sm text-[#e3e2e8] font-semibold leading-tight mt-0.5">
                    {task.title}
                  </h3>
                </div>
              </div>
              <span
                className={`shrink-0 font-label-spatial text-[10px] px-2 py-0.5 rounded border ${
                  task.completed
                    ? 'bg-[#bfcbac]/15 text-[#bfcbac] border-[#bfcbac]/30'
                    : 'bg-[#d6a34d]/20 text-[#f4be65] border-[#f4be65]/40 animate-pulse'
                }`}
              >
                {task.status}
              </span>
            </div>

            <p className="font-body-sm text-[#d3c4b2] text-xs mb-2.5 pl-6">
              {task.description}
            </p>

            {task.acceptanceCriteria && (
              <div className="pl-6 space-y-2 mb-3">
                <div className="bg-[#1a1b20] p-2 rounded border border-[#4f4537]/30 text-xs">
                  <span className="block font-label-spatial text-[10px] text-[#9c8f7e] uppercase">
                    Acceptance Criteria
                  </span>
                  <span className="text-[#e3e2e8]">{task.acceptanceCriteria}</span>
                </div>
                {task.linkedRisk && (
                  <div className="space-y-1 font-label-spatial text-[10px]">
                    <div className="flex items-center gap-1.5 text-[#d1c5ad]">
                      <span className="material-symbols-outlined text-xs text-[#f4be65]">warning</span>
                      <span>
                        <strong>Linked Risk:</strong> {task.linkedRisk}
                      </span>
                    </div>
                    {task.fallback && (
                      <div className="flex items-center gap-1.5 text-[#d3c4b2]">
                        <span className="material-symbols-outlined text-xs text-[#9c8f7e]">alt_route</span>
                        <span>
                          <strong>Fallback:</strong> {task.fallback}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Task Controls & Badges */}
            <div className="pl-6 pt-2 border-t border-[#4f4537]/20 flex flex-wrap gap-2 items-center justify-between font-label-spatial text-[10px]">
              {task.duration && (
                <div className="flex items-center gap-1 text-[#d1c5ad]">
                  <span className="material-symbols-outlined text-xs">schedule</span>
                  <span>{task.duration}</span>
                </div>
              )}
              {task.environment && (
                <div className="flex items-center gap-1 text-[#d3c4b2]">
                  <span className="material-symbols-outlined text-xs">memory</span>
                  <span>{task.environment}</span>
                </div>
              )}
              {task.metric && (
                <div className="w-full text-[#bfcbac] flex items-center gap-1 bg-[#292a2f]/60 px-2 py-1 rounded">
                  <span className="material-symbols-outlined text-xs">insights</span>
                  <span>{task.metric}</span>
                </div>
              )}

              {task.isCritical && (
                <div className="w-full flex items-center justify-between gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => onShowToast('Field telemetry data logged to active SQLite ledger')}
                    className="flex-1 py-1.5 px-2 bg-[#1e1f24] hover:bg-[#34343a] border border-[#4f4537]/40 rounded font-label-spatial text-[11px] text-[#d3c4b2] hover:text-[#f4be65] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">terminal</span>
                    <span>Log Field Telemetry</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className="py-1.5 px-3 bg-[#d6a34d] text-[#573a00] hover:bg-[#f4be65] font-label-spatial text-[11px] font-semibold rounded shadow-sm transition-all active:scale-95 flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xs">done_all</span>
                    <span>{task.completed ? 'Re-open' : 'Mark Verified'}</span>
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
      </section>

      {/* DOCKED ACTIONS */}
      <div className="mt-6 mb-2 space-y-2">
        <button
          type="button"
          onClick={() => setShowAppendModal(true)}
          className="w-full py-2.5 px-4 bg-[#d6a34d] text-[#281900] font-headline-sm text-sm rounded hover:bg-[#f4be65] transition-all duration-150 font-semibold shadow-md active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined">add_task</span>
          <span>+ Append Empirical Task</span>
        </button>
        <button
          type="button"
          onClick={() => onShowToast('Exporting Gantt & Jira JSON roadmap specification...')}
          className="w-full py-2 px-4 bg-[#292a2f] text-[#d1c5ad] border border-[#4f4537]/40 rounded font-label-spatial text-[11px] hover:border-[#f4be65]/50 hover:text-[#e3e2e8] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-sm">ios_share</span>
          <span>Export Gantt & Jira JSON</span>
        </button>
      </div>

      {/* Modal to append task */}
      {showAppendModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAppendModal(false)}
        >
          <div
            className="bg-[#1a1b20] border border-[#f4be65]/40 rounded-xl p-5 w-full max-w-md space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#4f4537]/30 pb-2">
              <h3 className="font-headline-sm text-base text-[#e3e2e8]">
                Append Empirical Task to Roadmap
              </h3>
              <button
                type="button"
                onClick={() => setShowAppendModal(false)}
                className="text-[#9c8f7e] hover:text-[#e3e2e8]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAppendTask} className="space-y-3">
              <div>
                <label className="block text-xs font-label-spatial text-[#d3c4b2] mb-1">
                  Task Milestone Title
                </label>
                <input
                  type="text"
                  required
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Dual-Frequency Ground Penetration Test..."
                  className="w-full bg-[#1e1f24] border border-[#4f4537]/50 rounded px-3 py-2 text-xs text-[#e3e2e8] focus:border-[#f4be65] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-label-spatial text-[#d3c4b2] mb-1">
                  Subsystem Category
                </label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value)}
                  className="w-full bg-[#1e1f24] border border-[#4f4537]/50 rounded px-3 py-2 text-xs text-[#e3e2e8] focus:border-[#f4be65] focus:outline-none"
                >
                  <option value="ODOMETRY CORE">ODOMETRY CORE</option>
                  <option value="BALLISTICS & SOIL BIO">BALLISTICS & SOIL BIO</option>
                  <option value="AVIONICS & COMPUTE">AVIONICS & COMPUTE</option>
                  <option value="ECOLOGICAL SAFETY">ECOLOGICAL SAFETY</option>
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2 rounded bg-[#d6a34d] text-[#281900] font-bold text-xs hover:bg-[#f4bd65] cursor-pointer"
                >
                  Append to Sprint 02
                </button>
                <button
                  type="button"
                  onClick={() => setShowAppendModal(false)}
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

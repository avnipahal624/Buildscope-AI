import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { subscribeToAnnotations, createAnnotation, AnnotationData } from '../firebase/db';
import { useFirebase } from '../firebase/context';

interface SpatialJournalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeFolioId?: string;
  activeFolioTitle?: string;
  onShowToast: (msg: string) => void;
}

export interface TelemetryEvent {
  id: string;
  timestamp: string;
  type: 'telemetry' | 'annotation' | 'flag';
  system: string;
  title: string;
  value?: string;
  unit?: string;
  severity: 'nominal' | 'warning' | 'alert' | 'info';
  details: string;
  author?: string;
  proofHash?: string;
}

const INITIAL_TELEMETRY: TelemetryEvent[] = [
  {
    id: 'tel-001',
    timestamp: 'Just now',
    type: 'flag',
    system: 'DARPA §4.2 Pneumatic Actuator',
    title: '3.20 MPa Solenoid Cyclic Pressure Deficit',
    value: '3.20',
    unit: 'MPa',
    severity: 'alert',
    details: 'Drop below 4.00 MPa nominal requirement. 1,420 cycles bench recorded. BLK-782 gate tripped.',
    proofHash: '0x8F4A...782'
  },
  {
    id: 'tel-002',
    timestamp: '2 min ago',
    type: 'telemetry',
    system: 'Fallback Protocol B-2 Rotary Pre-Drill',
    title: 'Auger Actuation Bench Ingestion',
    value: '185',
    unit: 'RPM',
    severity: 'nominal',
    details: 'Humus torque resistance steady at 8.4 Nm. Soil penetration depth 14.2 cm achieved without pneumatic reliance.',
    proofHash: '0x3D9B...185'
  },
  {
    id: 'tel-003',
    timestamp: '6 min ago',
    type: 'telemetry',
    system: 'Botanical LiDAR Turret (Orin Nano)',
    title: 'Sub-Canopy Point Cloud Ingestion',
    value: '148,200',
    unit: 'pts/sec',
    severity: 'nominal',
    details: '72.4% stand penetration through dense larch needles. SLAM botanical moat drift < 1.4 cm/100m.',
    proofHash: '0x5C2E...884'
  },
  {
    id: 'tel-004',
    timestamp: '14 min ago',
    type: 'telemetry',
    system: 'Barometric AGL & Ultrasound Array',
    title: 'Low-Altitude Canopy Ceiling Lock',
    value: '2.84',
    unit: 'm AGL',
    severity: 'info',
    details: 'Ground proximity sustained under 18 knot wind shear in boreal stand testing zone Alpha.',
    proofHash: '0x71AB...092'
  },
  {
    id: 'tel-005',
    timestamp: '22 min ago',
    type: 'telemetry',
    system: 'CAN-bus MAVLink Telemetry Bridge',
    title: 'Heartbeat Packet Transmission',
    value: '12',
    unit: 'ms ping',
    severity: 'nominal',
    details: 'Zero frame drop across 10,000 consecutive message cycles between Orin Nano and Pixhawk 6X.',
    proofHash: '0x1F3C...990'
  }
];

export const SpatialJournalSidebar: React.FC<SpatialJournalSidebarProps> = ({
  isOpen,
  onClose,
  activeFolioId = 'folio-884',
  activeFolioTitle = 'Autonomous Drone Seedling v2.4 (Folio #884-DS)',
  onShowToast
}) => {
  const { user } = useFirebase();
  const [filter, setFilter] = useState<'all' | 'telemetry' | 'annotations' | 'flags'>('all');
  const [telemetryEvents, setTelemetryEvents] = useState<TelemetryEvent[]>(INITIAL_TELEMETRY);
  const [firestoreAnnotations, setFirestoreAnnotations] = useState<AnnotationData[]>([]);
  const [isSimulatingBurst, setIsSimulatingBurst] = useState(false);

  // New annotation form state
  const [isAddingAnnotation, setIsAddingAnnotation] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newCategory, setNewCategory] = useState<'Hardware' | 'Kinematics' | 'Soil' | 'Flight Safety' | 'Observation'>('Hardware');
  const [newMetric, setNewMetric] = useState('3.2 MPa');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subscribe to real-time Firestore annotations
  useEffect(() => {
    let unsubscribe: () => void = () => {};
    try {
      unsubscribe = subscribeToAnnotations(activeFolioId, (annotations) => {
        setFirestoreAnnotations(annotations);
      });
    } catch (err) {
      console.warn('Real-time annotations listener error:', err);
    }
    return () => unsubscribe();
  }, [activeFolioId]);

  // Periodic simulated live telemetry tick every 18 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const liveSystems = [
        {
          system: 'Sub-Canopy Sonar Grid',
          title: 'Obstacle Distance Vector',
          value: `${(1.2 + Math.random() * 2.5).toFixed(2)}`,
          unit: 'm',
          severity: 'nominal' as const,
          details: 'Dynamic branch clearance detected by ultrasonic downward array.'
        },
        {
          system: 'Thermal Battery Telemetry',
          title: 'Cell Core Discharge Rate',
          value: `${(21.4 + Math.random() * 6).toFixed(1)}`,
          unit: 'A',
          severity: 'nominal' as const,
          details: 'Pack temp 36.8°C with 78% capacity remaining in hover test.'
        },
        {
          system: 'Soil Hydration Sensor',
          title: 'Substrate Moisture Ingestion',
          value: `${(42 + Math.random() * 12).toFixed(1)}`,
          unit: '%',
          severity: 'info' as const,
          details: 'Pod substrate hydraulic pressure confirmed suitable for dart penetration.'
        }
      ];

      const chosen = liveSystems[Math.floor(Math.random() * liveSystems.length)];
      const newEvent: TelemetryEvent = {
        id: `tel-${Date.now()}`,
        timestamp: 'Just now',
        type: 'telemetry',
        ...chosen,
        proofHash: `0x${Math.random().toString(16).substring(2, 6).toUpperCase()}...${Date.now().toString().slice(-3)}`
      };

      setTelemetryEvents((prev) => [newEvent, ...prev.slice(0, 15)]);
    }, 18000);

    return () => clearInterval(interval);
  }, []);

  const handleSimulateBurst = () => {
    setIsSimulatingBurst(true);
    setTimeout(() => {
      const burstEvent: TelemetryEvent = {
        id: `tel-burst-${Date.now()}`,
        timestamp: 'Just now',
        type: 'telemetry',
        system: 'CAN-bus High-Frequency Burst',
        title: 'MAVLink Field Ingestion Pulse',
        value: '240',
        unit: 'Hz',
        severity: 'nominal',
        details: 'Simulated synchronous 240Hz sensor dump from Pixhawk 6X & Orin Nano companion computer.',
        proofHash: `0xBURST...${Date.now().toString().slice(-4)}`
      };
      setTelemetryEvents((prev) => [burstEvent, ...prev]);
      setIsSimulatingBurst(false);
      onShowToast('Real-time CAN-bus telemetry burst ingested into Spatial Journal');
      confetti({
        particleCount: 20,
        spread: 45,
        origin: { x: 0.85, y: 0.3 }
      });
    }, 450);
  };

  const handleCreateAnnotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newText.trim()) {
      onShowToast('Please provide both title and observation text');
      return;
    }

    setIsSubmitting(true);
    const annotationPayload: AnnotationData = {
      id: `ann_${Date.now()}`,
      authorId: user?.uid || 'curator_session',
      folioId: activeFolioId,
      title: newTitle.trim(),
      text: newText.trim(),
      category: newCategory,
      metric: newMetric.trim() || undefined,
      createdAt: new Date().toISOString()
    };

    try {
      await createAnnotation(annotationPayload);
      setIsSubmitting(false);
      setIsAddingAnnotation(false);
      setNewTitle('');
      setNewText('');
      onShowToast('Annotation pinned to Spatial Journal & persisted to Firestore');
      confetti({
        particleCount: 25,
        spread: 50,
        origin: { x: 0.85, y: 0.4 },
        colors: ['#f4be65', '#d6a34d', '#bfcbac']
      });
    } catch (err) {
      console.warn('Annotation creation notice:', err);
      // Fallback local display
      setFirestoreAnnotations((prev) => [annotationPayload, ...prev]);
      setIsSubmitting(false);
      setIsAddingAnnotation(false);
      setNewTitle('');
      setNewText('');
      onShowToast('Annotation recorded in local journal');
    }
  };

  if (!isOpen) return null;

  // Merge and sort all activities
  const combinedActivities: Array<
    | { kind: 'telemetry'; data: TelemetryEvent }
    | { kind: 'annotation'; data: AnnotationData }
  > = [];

  telemetryEvents.forEach((t) => combinedActivities.push({ kind: 'telemetry', data: t }));
  firestoreAnnotations.forEach((a) => combinedActivities.push({ kind: 'annotation', data: a }));

  const filteredActivities = combinedActivities.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'telemetry') return item.kind === 'telemetry' && item.data.type !== 'flag';
    if (filter === 'annotations') return item.kind === 'annotation';
    if (filter === 'flags') return item.kind === 'telemetry' && item.data.type === 'flag';
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in-up"
      onClick={onClose}
    >
      <aside
        className="w-full sm:w-[460px] md:w-[500px] h-full bg-[#16171c] border-l border-[#4f4537]/50 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <header className="p-4 border-b border-[#4f4537]/40 bg-[#1c1d22] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#f4be65] text-[22px]">
              history_edu
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-sm text-base text-[#e3e2e8]">
                  Spatial Activity Journal
                </h2>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-label-spatial bg-[#a4b092]/20 text-[#bfcbac] border border-[#bfcbac]/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac] animate-pulse" />
                  LIVE SYNC
                </span>
              </div>
              <p className="text-[11px] font-label-spatial text-[#9c8f7e] truncate max-w-[260px]">
                {activeFolioTitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleSimulateBurst}
              disabled={isSimulatingBurst}
              className="px-2 py-1 rounded bg-[#121318] hover:bg-[#292a2f] border border-[#4f4537]/40 text-[#f4be65] text-[10px] font-label-spatial flex items-center gap-1 cursor-pointer transition-colors"
              title="Trigger simulated CAN-bus telemetry burst"
            >
              <span className={`material-symbols-outlined text-[13px] ${isSimulatingBurst ? 'animate-spin' : ''}`}>
                bolt
              </span>
              <span>Burst</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded bg-[#121318] text-[#9c8f7e] hover:text-[#e3e2e8] flex items-center justify-center cursor-pointer transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </header>

        {/* Filter Pills & Add Annotation Bar */}
        <div className="p-3 bg-[#121318] border-b border-[#4f4537]/30 flex flex-wrap items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1 text-[11px] font-label-tag">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-[#d6a34d] text-[#281900] font-bold shadow-xs'
                  : 'bg-[#1e1f24] text-[#d3c4b2] hover:text-[#f4be65]'
              }`}
            >
              All ({combinedActivities.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('telemetry')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                filter === 'telemetry'
                  ? 'bg-[#d6a34d] text-[#281900] font-bold shadow-xs'
                  : 'bg-[#1e1f24] text-[#d3c4b2] hover:text-[#f4be65]'
              }`}
            >
              Telemetry
            </button>
            <button
              type="button"
              onClick={() => setFilter('annotations')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                filter === 'annotations'
                  ? 'bg-[#d6a34d] text-[#281900] font-bold shadow-xs'
                  : 'bg-[#1e1f24] text-[#d3c4b2] hover:text-[#f4be65]'
              }`}
            >
              Annotations ({firestoreAnnotations.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('flags')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                filter === 'flags'
                  ? 'bg-[#93000a] text-[#ffdad6] font-bold'
                  : 'bg-[#1e1f24] text-[#ffb4ab] hover:text-[#ffdad6]'
              }`}
            >
              Flags
            </button>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingAnnotation(!isAddingAnnotation)}
            className="px-2.5 py-1 rounded bg-[#292a2f] border border-[#f4be65]/50 text-[#f4be65] text-[11px] font-label-tag font-semibold flex items-center gap-1 hover:bg-[#34343a] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[14px]">
              {isAddingAnnotation ? 'close' : 'add_comment'}
            </span>
            <span>{isAddingAnnotation ? 'Cancel' : 'New Note'}</span>
          </button>
        </div>

        {/* Quick Add Annotation Form */}
        {isAddingAnnotation && (
          <form
            onSubmit={handleCreateAnnotation}
            className="p-3 bg-[#1e1f24] border-b border-[#4f4537]/50 space-y-2.5 text-xs animate-fade-in-up shrink-0"
          >
            <div className="flex items-center justify-between">
              <span className="font-label-spatial text-[10px] text-[#f4be65] uppercase font-bold">
                PIN CURATOR OBSERVATION
              </span>
              <span className="text-[10px] text-[#9c8f7e] font-label-spatial">
                SYNCED TO FIRESTORE
              </span>
            </div>

            <div>
              <input
                type="text"
                required
                placeholder="Annotation title (e.g. Dart hydraulic cavitation observation)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full bg-[#0d0e13] border border-[#4f4537]/60 rounded px-2.5 py-1.5 text-xs text-[#e3e2e8] focus:border-[#d6a34d] focus:outline-none"
              />
            </div>

            <div>
              <textarea
                required
                rows={2}
                placeholder="Field observations, sensor drift observations, or flight approval comments..."
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                className="w-full bg-[#0d0e13] border border-[#4f4537]/60 rounded px-2.5 py-1.5 text-xs text-[#e3e2e8] focus:border-[#d6a34d] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-label-spatial text-[#9c8f7e] mb-1">
                  CATEGORY
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full bg-[#0d0e13] border border-[#4f4537]/60 rounded px-2 py-1 text-xs text-[#e3e2e8] focus:border-[#d6a34d] focus:outline-none"
                >
                  <option value="Hardware">Hardware</option>
                  <option value="Kinematics">Kinematics</option>
                  <option value="Soil">Soil Mechanics</option>
                  <option value="Flight Safety">Flight Safety</option>
                  <option value="Observation">Observation</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-label-spatial text-[#9c8f7e] mb-1">
                  METRIC ANCHOR
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3.2 MPa / 185 RPM"
                  value={newMetric}
                  onChange={(e) => setNewMetric(e.target.value)}
                  className="w-full bg-[#0d0e13] border border-[#4f4537]/60 rounded px-2 py-1 text-xs text-[#e3e2e8] focus:border-[#d6a34d] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsAddingAnnotation(false)}
                className="px-3 py-1 rounded bg-[#121318] text-[#9c8f7e] hover:text-[#e3e2e8] text-xs font-label-tag"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-tactile-gold px-3.5 py-1 rounded font-label-tag text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[13px] animate-spin">refresh</span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[13px]">bookmark</span>
                    <span>Pin to Journal</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Scrollable Timeline Activity Feed */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
          {filteredActivities.length === 0 ? (
            <div className="p-8 text-center text-[#9c8f7e] space-y-2">
              <span className="material-symbols-outlined text-[32px] text-[#4f4537]">
                filter_list_off
              </span>
              <p className="text-xs font-label-spatial">No activity records match this filter.</p>
            </div>
          ) : (
            filteredActivities.map((item, idx) => {
              if (item.kind === 'annotation') {
                const ann = item.data;
                return (
                  <article
                    key={ann.id || `ann-${idx}`}
                    className="p-3 rounded-lg bg-[#1f2026] border border-[#d6a34d]/40 shadow-md space-y-2 relative transition-all hover:border-[#f4be65]"
                  >
                    {/* Washi tape visual detail */}
                    <div className="absolute -top-2 right-4 w-10 h-3 bg-[#f4be65]/20 backdrop-blur-xs border-b border-[#f4be65]/30 rotate-2 pointer-events-none" />

                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-[#504836] border border-[#f4be65]/50 flex items-center justify-center text-[10px] font-bold text-[#f4be65]">
                          AV
                        </span>
                        <div>
                          <span className="font-label-spatial text-[10px] text-[#f4be65] uppercase font-bold">
                            Curator Annotation
                          </span>
                          <h3 className="font-headline-sm text-xs sm:text-sm text-[#e3e2e8]">
                            {ann.title}
                          </h3>
                        </div>
                      </div>

                      {ann.metric && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-label-spatial bg-[#0d0e13] text-[#f4be65] border border-[#f4be65]/30">
                          {ann.metric}
                        </span>
                      )}
                    </div>

                    <p className="font-body-sm text-xs text-[#d3c4b2] leading-relaxed">
                      "{ann.text}"
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#9c8f7e] pt-1.5 border-t border-[#4f4537]/30">
                      <span>Category: {ann.category || 'Observation'}</span>
                      <span>
                        {ann.createdAt ? new Date(ann.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
                      </span>
                    </div>
                  </article>
                );
              }

              // Telemetry item
              const tel = item.data;
              return (
                <article
                  key={tel.id || `tel-${idx}`}
                  className={`p-3 rounded-lg border shadow-sm space-y-2 transition-all ${
                    tel.severity === 'alert'
                      ? 'bg-[#93000a]/15 border-[#ffb4ab]/50'
                      : 'bg-[#1a1b20] border-[#4f4537]/40 hover:border-[#f4be65]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`material-symbols-outlined text-[16px] ${
                          tel.severity === 'alert'
                            ? 'text-[#ffb4ab]'
                            : tel.severity === 'warning'
                            ? 'text-[#f4be65]'
                            : 'text-[#bfcbac]'
                        }`}
                      >
                        {tel.severity === 'alert'
                          ? 'warning'
                          : tel.severity === 'warning'
                          ? 'tune'
                          : 'sensors'}
                      </span>
                      <div>
                        <span className="font-label-spatial text-[9px] text-[#9c8f7e] uppercase block">
                          {tel.system}
                        </span>
                        <h3
                          className={`font-label-tag text-xs font-semibold ${
                            tel.severity === 'alert' ? 'text-[#ffb4ab]' : 'text-[#e3e2e8]'
                          }`}
                        >
                          {tel.title}
                        </h3>
                      </div>
                    </div>

                    {tel.value && (
                      <div className="text-right">
                        <span
                          className={`font-label-spatial text-xs font-bold ${
                            tel.severity === 'alert' ? 'text-[#ffb4ab]' : 'text-[#f4be65]'
                          }`}
                        >
                          {tel.value} {tel.unit}
                        </span>
                      </div>
                    )}
                  </div>

                  <p className="font-body-sm text-[11px] text-[#d3c4b2] leading-relaxed">
                    {tel.details}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-label-spatial text-[#9c8f7e] pt-1.5 border-t border-[#4f4537]/25">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[11px] text-[#bfcbac]">
                        fingerprint
                      </span>
                      <span>Proof: {tel.proofHash}</span>
                    </span>
                    <span>{tel.timestamp}</span>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Footer with Export & Telemetry Status */}
        <footer className="p-3 bg-[#121318] border-t border-[#4f4537]/40 flex items-center justify-between text-[11px] font-label-spatial text-[#9c8f7e] shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#bfcbac] inline-block" />
            <span>MAVLink Ingest: 240 Hz</span>
          </div>

          <button
            type="button"
            onClick={() => {
              const exportText = JSON.stringify(combinedActivities, null, 2);
              navigator.clipboard?.writeText(exportText);
              onShowToast('Journal activity log copied to clipboard (JSON)');
            }}
            className="hover:text-[#f4be65] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">file_download</span>
            <span>Export Log</span>
          </button>
        </footer>
      </aside>
    </div>
  );
};

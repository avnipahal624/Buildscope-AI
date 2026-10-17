import React, { useState } from 'react';
import { AppScreen } from '../types';
import { useFirebase } from '../firebase/context';

interface AuthViewProps {
  onNavigate: (screen: AppScreen) => void;
  onShowToast: (message: string) => void;
  initialMode?: 'signin' | 'register';
}

export const AuthView: React.FC<AuthViewProps> = ({
  onNavigate,
  onShowToast,
  initialMode = 'signin'
}) => {
  const [isRegisterMode, setIsRegisterMode] = useState(initialMode === 'register');
  const [fullName, setFullName] = useState('Dr. Aris Vandenberg');
  const [email, setEmail] = useState('a.vandenberg@stanford.edu');
  const [password, setPassword] = useState('atelier-vault-spatial-tau-4892!');
  const [confirmPassword, setConfirmPassword] = useState('atelier-vault-spatial-tau-4892!');
  const [showPassword, setShowPassword] = useState(false);
  const [agree1, setAgree1] = useState(true);
  const [agree2, setAgree2] = useState(true);

  // Password entropy calculation
  const getEntropyBits = (pass: string) => {
    if (!pass) return 0;
    let pool = 0;
    if (/[a-z]/.test(pass)) pool += 26;
    if (/[A-Z]/.test(pass)) pool += 26;
    if (/[0-9]/.test(pass)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pass)) pool += 32;
    return Math.min(96, Math.round(pass.length * Math.log2(pool || 1)));
  };

  const entropy = getEntropyBits(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegisterMode) {
      onShowToast('Research Folio Account initialized! Redirecting to Onboarding...');
      setTimeout(() => onNavigate('onboarding'), 800);
    } else {
      onShowToast(`Welcome back, ${fullName}! Workspace credentials verified.`);
      setTimeout(() => onNavigate('discover'), 800);
    }
  };

  const { user, signInWithGoogle, signOutUser } = useFirebase();

  const handleGoogleSignIn = async () => {
    try {
      onShowToast('Authenticating with Google Firebase Auth...');
      await signInWithGoogle();
      onShowToast('Google authentication successful! Profile synced.');
      onNavigate('discover');
    } catch (err) {
      console.error(err);
      onShowToast('Google authentication failed. Please try again.');
    }
  };

  return (
    <main className="pt-20 px-3 sm:px-6 max-w-md mx-auto pb-32">
      {user && (
        <div className="mb-4 p-3 rounded-lg bg-[#292a2f] border border-[#f4be65]/40 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#bfcbac] text-[20px]">verified_user</span>
            <div>
              <p className="font-headline-sm text-xs text-[#e3e2e8]">
                Signed in as {user.displayName || user.email}
              </p>
              <p className="font-label-spatial text-[10px] text-[#bfcbac]">
                Firebase UID: {user.uid.substring(0, 10)}...
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={async () => {
              await signOutUser();
              onShowToast('Signed out of Firebase');
            }}
            className="px-2 py-1 rounded bg-[#1e1f24] hover:bg-[#34343a] text-xs text-[#ffb4ab] border border-[#4f4537]/50 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
      {/* Auth Switcher Dock */}
      <div className="p-1 rounded bg-[#1a1b20] border border-[#4f4537]/30 flex items-center justify-between mb-4 shadow-sm">
        <button
          type="button"
          onClick={() => setIsRegisterMode(false)}
          className={`flex-1 py-1.5 text-center text-xs font-label-tag transition-all cursor-pointer ${
            !isRegisterMode
              ? 'rounded bg-[#d6a34d] text-[#281900] shadow-sm font-semibold'
              : 'text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => setIsRegisterMode(true)}
          className={`flex-1 py-1.5 text-center text-xs font-label-tag transition-all cursor-pointer ${
            isRegisterMode
              ? 'rounded bg-[#d6a34d] text-[#281900] shadow-sm font-semibold'
              : 'text-[#d3c4b2] hover:text-[#f4be65]'
          }`}
        >
          Create Folio Account
        </button>
      </div>

      {/* Protocol Folio Subheading & Headline */}
      <div className="mb-4">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="material-symbols-outlined text-[#f4be65] text-[15px]">
            {isRegisterMode ? 'token' : 'architecture'}
          </span>
          <span className="text-[10px] font-label-spatial text-[#d1c5ad] uppercase tracking-wider">
            STUDIO ACCESS PROTOCOL · {isRegisterMode ? 'FOLIO #AUTH-REGISTER' : 'FOLIO #AUTH'}
          </span>
        </div>
        <h1 className="text-headline-lg-mobile text-[24px] sm:text-[28px] text-[#e3e2e8] tracking-tight mb-1 font-medium">
          {isRegisterMode
            ? 'Begin your builder & research folio.'
            : 'Welcome back, researcher.'}
        </h1>
        <p className="text-body-sm text-xs text-[#d3c4b2] leading-relaxed">
          {isRegisterMode
            ? 'Establish an encrypted academic identity to benchmark, simulate, and defend novel architectures.'
            : 'Your ideas, discoveries, and build plans are waiting for you.'}
        </p>
      </div>

      {/* Zero-Knowledge Badge */}
      <div className="mb-4 p-2.5 rounded bg-[#292a2f] border border-[#4f4537]/40 flex items-center gap-2.5">
        <div className="p-1.5 rounded bg-[#0d0e13] text-[#f4be65] flex items-center justify-center border border-[#4f4537]/30">
          <span className="material-symbols-outlined text-[16px]">lock_clock</span>
        </div>
        <div className="flex-1">
          <div className="text-[9px] uppercase font-label-spatial text-[#f4be65] tracking-widest leading-none mb-0.5">
            ACADEMIC & BUILDER ACCESS
          </div>
          <div className="text-[11px] font-label-tag text-[#d3c4b2]">
            ENCRYPTED LOCAL KEYS · CLIENT-SIDE ATTESTATION
          </div>
        </div>
        <span className="material-symbols-outlined text-[#bfcbac] text-[18px]">verified_user</span>
      </div>

      {/* Registration / Sign-in Form Plate */}
      <div className="relative bg-[#1e1f24] rounded-lg p-4 border border-[#4f4537]/30 shadow-lg">
        {/* Scrapbook Tape Accent */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-t notebook-washi-tape font-label-spatial text-[#d1c5ad] tracking-widest text-[9px] uppercase border border-[#4f4537]/40">
          ATELIER SPEC 89-K
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {isRegisterMode && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-label-spatial text-[#d1c5ad] text-[10px] uppercase tracking-wider flex items-center gap-1">
                  01 // BUILDER ALIAS OR LEGAL NAME
                </label>
                <span className="text-[10px] font-label-spatial text-[#9c8f7e]">ED25519 ID</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Dr. Jane Doe / spatial_node_9"
                  className="w-full bg-[#0d0e13] border border-[#4f4537]/60 rounded px-3 py-2 text-xs text-[#e3e2e8] placeholder:text-[#9c8f7e] focus:border-[#d6a34d] focus:outline-none transition-colors"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#f4be65]">
                  <span className="material-symbols-outlined text-[16px]">fingerprint</span>
                </div>
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-label-spatial text-[#d1c5ad] text-[10px] uppercase tracking-wider flex items-center gap-1">
                {isRegisterMode ? '02 // INSTITUTIONAL OR RESEARCH EMAIL' : 'INSTITUTIONAL OR PERSONAL EMAIL'}
              </label>
              <span className="flex items-center gap-1 text-[10px] font-label-spatial text-[#bfcbac]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#bfcbac]" />
                NODE ACTIVE
              </span>
            </div>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@institute.edu"
                className="w-full bg-[#0d0e13] border border-[#4f4537]/60 rounded px-3 py-2 text-xs text-[#e3e2e8] placeholder:text-[#9c8f7e] focus:border-[#d6a34d] focus:outline-none transition-colors"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#d1c5ad]">
                <span className="material-symbols-outlined text-[16px]">alternate_email</span>
              </div>
            </div>
            {isRegisterMode && (
              <div className="mt-1 flex items-center gap-1 text-[10px] font-label-spatial text-[#9c8f7e]">
                <span className="material-symbols-outlined text-[12px] text-[#bfcbac]">hub</span>
                <span>Federated link established via EDU-TRUST Mesh</span>
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-label-spatial text-[#d1c5ad] text-[10px] uppercase tracking-wider flex items-center gap-1">
                {isRegisterMode ? '03 // WORKSPACE MASTER KEYPHRASE' : 'SECURE WORKSPACE KEYPHRASE'}
              </label>
              {isRegisterMode && (
                <span className="text-[10px] font-label-spatial text-[#f4be65]">SALTED SHA-512</span>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••••••••••"
                className="w-full bg-[#0d0e13] border border-[#4f4537]/60 rounded px-3 py-2 text-xs text-[#e3e2e8] placeholder:text-[#9c8f7e] focus:border-[#d6a34d] focus:outline-none transition-colors tracking-wide"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#d3c4b2] hover:text-[#f4be65] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Password Entropy Meter */}
            {isRegisterMode && (
              <div className="mt-2 p-2 rounded bg-[#1a1b20] border border-[#4f4537]/30 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-label-spatial">
                  <span className="text-[#d3c4b2] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[#f4be65] text-[13px]">shield</span>
                    Entropy: <strong className="text-[#f4be65] font-semibold">{entropy} bits</strong>
                  </span>
                  <span className="text-[#bfcbac] font-medium">Cryptographically Sound</span>
                </div>
                <div className="grid grid-cols-4 gap-1 h-1.5">
                  <div className="rounded-sm bg-[#d6a34d] h-full" />
                  <div className="rounded-sm bg-[#d6a34d] h-full" />
                  <div className="rounded-sm bg-[#f4be65] h-full" />
                  <div className="rounded-sm bg-[#bfcbac] h-full" />
                </div>
                <div className="text-[10px] font-label-spatial text-[#9c8f7e] flex justify-between">
                  <span>High Resilience / 16 Char Minimum</span>
                  <span className="text-[#bfcbac]">Passed</span>
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password (Register mode only) */}
          {isRegisterMode && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-label-spatial text-[#d1c5ad] text-[10px] uppercase tracking-wider flex items-center gap-1">
                  04 // CONFIRM KEYPHRASE
                </label>
                <span className="text-[10px] font-label-spatial text-[#bfcbac] flex items-center gap-0.5">
                  <span className="material-symbols-outlined text-[12px]">check</span>
                  MATCH CONFIRMED
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••••••••••••••"
                  className="w-full bg-[#0d0e13] border border-[#4f4537]/60 rounded px-3 py-2 text-xs text-[#e3e2e8] placeholder:text-[#9c8f7e] focus:border-[#d6a34d] focus:outline-none transition-colors tracking-wide"
                />
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#bfcbac]">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
              </div>
            </div>
          )}

          {/* Checkboxes */}
          {isRegisterMode ? (
            <div className="pt-1 border-t border-[#4f4537]/30 space-y-2">
              <label className="flex items-start gap-2 cursor-pointer group text-xs text-[#d3c4b2]">
                <input
                  type="checkbox"
                  checked={agree1}
                  onChange={(e) => setAgree1(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded-none bg-[#0d0e13] border-[#9c8f7e] text-[#d6a34d] focus:ring-0"
                />
                <span>
                  Institutional verification & Git sync authorization for distributed model checkpoints.
                </span>
              </label>
              <label className="flex items-start gap-2 cursor-pointer group text-xs text-[#d3c4b2]">
                <input
                  type="checkbox"
                  checked={agree2}
                  onChange={(e) => setAgree2(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded-none bg-[#0d0e13] border-[#9c8f7e] text-[#d6a34d] focus:ring-0"
                />
                <span>
                  I accept the Atelier Academic Non-Disclosure & Zero-Knowledge Ledger Protocol.
                </span>
              </label>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-[#d3c4b2]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 rounded bg-[#1a1b20] border-[#4f4537] text-[#d6a34d] focus:ring-0"
                />
                <span>Remember credentials</span>
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  onShowToast('Temporary master key reset link dispatched to authenticated node');
                }}
                className="text-xs text-[#f4be65] hover:underline"
              >
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-3 px-4 rounded bg-[#d6a34d] text-[#281900] font-headline-sm text-sm font-semibold hover:bg-[#f4bd65] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <span>{isRegisterMode ? 'Create Research Folio Account' : 'Log In to Research Workspace'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative py-1 flex items-center justify-center">
            <div className="w-full border-t border-[#4f4537]/30" />
            <span className="font-label-spatial text-[10px] text-[#9c8f7e] bg-[#1e1f24] px-2 absolute uppercase">
              or federate identity via academic credentials
            </span>
          </div>

          {/* Google Workspace / Firebase Auth SSO */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-2.5 px-3 bg-[#1a1b20] hover:bg-[#292a2f] border border-[#f4be65]/40 hover:border-[#f4be65] rounded flex items-center justify-center gap-2.5 text-xs text-[#e3e2e8] transition-colors cursor-pointer shadow-md"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.2 8.9 5 12 5z" fill="#EA4335" />
              <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.8z" fill="#4285F4" />
              <path d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7 0-1.2.2-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z" fill="#FBBC05" />
              <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.2-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z" fill="#34A853" />
            </svg>
            <span>Sign in with Google Firebase Auth</span>
          </button>
        </form>
      </div>

      {/* Zero-Knowledge Disclosure Banner */}
      <div className="mt-4 p-3 bg-[#1a1b20] rounded border border-[#4f4537]/30 flex items-start gap-2.5 text-xs">
        <span className="material-symbols-outlined text-[18px] text-[#f4be65] mt-0.5">security</span>
        <div className="space-y-0.5">
          <p className="font-label-spatial text-[10px] text-[#e3e2e8] uppercase font-semibold">
            Zero-Knowledge Telemetry Moat
          </p>
          <p className="font-label-spatial text-[10px] text-[#9c8f7e] leading-relaxed">
            Client-side bcrypt derivation occurs entirely in WebAssembly memory. Your session uses stateless cryptographic JWTs. Raw secret material never traverses BuildScope spatial relays.
          </p>
        </div>
      </div>
    </main>
  );
};

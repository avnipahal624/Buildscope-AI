import React, { useEffect } from 'react';

interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClear();
    }, 2800);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 bg-[#d6a34d] text-[#281900] px-3.5 py-1.5 rounded-lg shadow-2xl text-xs font-label-tag font-bold transition-all duration-300 flex items-center gap-2 border border-[#ffdead] animate-bounce">
      <span className="material-symbols-outlined text-[17px]">check_circle</span>
      <span>{message}</span>
    </div>
  );
};

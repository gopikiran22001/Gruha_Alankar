import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const VoiceButton = ({ isActive, onClick, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Ripple Rings when active */}
      {isActive && (
        <>
          <span className="absolute inset-0 rounded-full bg-primary/10 animate-ping" />
          <span className="absolute -inset-2 rounded-full bg-primary/10 animate-pulse" />
        </>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className={`p-3 rounded-full border transition-all duration-300 focus:outline-none relative z-10 ${
          isActive
            ? 'bg-gradient-to-r from-primary to-secondary text-white border-primary shadow-glow'
            : 'bg-surface border-border text-muted hover:text-primary hover:border-border'
        }`}
      >
        {isActive ? <Mic size={18} /> : <MicOff size={18} />}
      </motion.button>
      
      {/* Soundwaves display when recording */}
      {isActive && (
        <div className="absolute top-1/2 -translate-y-1/2 right-14 flex items-center gap-1 bg-surface/90 border border-border px-2.5 py-1.5 rounded-lg backdrop-blur-md shadow-premium">
          <div className="w-1 h-3 bg-primary rounded animate-bounce" style={{ animationDelay: '0.1s' }} />
          <div className="w-1 h-5 bg-secondary rounded animate-bounce" style={{ animationDelay: '0.3s' }} />
          <div className="w-1 h-2 bg-primary rounded animate-bounce" style={{ animationDelay: '0.5s' }} />
          <span className="text-[10px] text-muted font-bold ml-1">Listening...</span>
        </div>
      )}
    </div>
  );
};

export default VoiceButton;

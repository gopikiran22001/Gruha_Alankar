import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export const Dialog = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl glass-panel-heavy p-6 shadow-glow z-10 border border-border"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-md text-muted hover:text-primary hover:bg-white/5 p-1 transition-colors"
            >
              <X size={16} />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export const DialogHeader = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

export const DialogTitle = ({ children, className = '' }) => (
  <h2 className={`text-lg font-bold text-white tracking-tight ${className}`}>{children}</h2>
);

export const DialogContent = ({ children, className = '' }) => (
  <div className={`text-sm text-text leading-relaxed mb-6 ${className}`}>{children}</div>
);

export const DialogFooter = ({ children, className = '' }) => (
  <div className={`flex justify-end gap-3 border-t border-border pt-4 ${className}`}>{children}</div>
);

import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/button';
import { Sparkles, HelpCircle } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-background relative select-none">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="w-full max-w-md glass-panel p-8 rounded-xl shadow-premium border border-border text-center flex flex-col items-center space-y-4">
        <div className="p-4 rounded-full bg-surface border border-border text-primary animate-pulse">
          <HelpCircle size={28} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-white">404 - Page Deficit</h2>
        <p className="text-xs text-muted max-w-xs leading-relaxed">
          The requested coordinate or design studio workspace cannot be verified. Let's return to the design console.
        </p>
        <Link to="/" className="w-full pt-2">
          <Button variant="primary" className="w-full">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

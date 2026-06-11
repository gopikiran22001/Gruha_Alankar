import React from 'react';
import { RefreshCw, CheckCircle, Search, Compass, Sparkles } from 'lucide-react';

export const AgentStatus = ({ state = 'Idle' }) => {
  const states = {
    Idle: { text: 'AI Standby', color: 'text-muted bg-background/60 border-zinc-900', icon: Compass },
    Thinking: { text: 'Thinking...', color: 'text-primary bg-zinc-800 border-border shadow-glow', icon: RefreshCw, animate: true },
    Analyzing: { text: 'Analyzing Room Geometry...', color: 'text-secondary bg-zinc-800 border-border shadow-glow-secondary', icon: Search, animate: true },
    Planning: { text: 'Planning Layout...', color: 'text-amber-500 bg-amber-500/5 border-amber-500/20', icon: Compass, animate: true },
    Recommending: { text: 'Generating Catalog Matches...', color: 'text-primary bg-zinc-800 border-border shadow-glow', icon: Sparkles, animate: true },
    Completed: { text: 'Task Completed', color: 'text-success bg-success/5 border-success/20', icon: CheckCircle }
  };

  const active = states[state] || states.Idle;
  const Icon = active.icon;

  return (
    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs font-semibold select-none backdrop-blur-md transition-all duration-300 ${active.color}`}>
      <Icon
        size={14}
        className={`${active.animate ? 'animate-spin' : ''} flex-shrink-0`}
        style={{ animationDuration: active.animate && state === 'Analyzing' ? '3s' : '1.5s' }}
      />
      <span>{active.text}</span>
    </div>
  );
};

export default AgentStatus;

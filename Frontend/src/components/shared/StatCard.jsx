import React from 'react';
import * as Icons from 'lucide-react';

export const StatCard = ({
  title,
  value,
  iconName,
  subtext,
  trend, // { value: '+12%', positive: true }
  className = ''
}) => {
  const IconComponent = Icons[iconName] || Icons.Sparkles;

  return (
    <div className={`glass-card p-5 relative overflow-hidden flex flex-col justify-between ${className}`}>
      {/* Background soft glow */}
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex justify-between items-start">
        <span className="text-xs font-semibold text-muted tracking-wider uppercase">{title}</span>
        <div className="p-2 rounded-lg bg-surface/80 border border-border text-primary">
          <IconComponent size={18} />
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-2xl font-bold tracking-tight text-white">{value}</h4>
        
        {/* Subtext and trends */}
        <div className="flex items-center gap-2 mt-1">
          {trend && (
            <span className={`text-xs font-semibold ${trend.positive ? 'text-success' : 'text-rose-500'}`}>
              {trend.value}
            </span>
          )}
          {subtext && <span className="text-xs text-muted">{subtext}</span>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

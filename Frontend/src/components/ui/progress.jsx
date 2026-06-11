import React from 'react';

export const Progress = ({ value = 0, className = '', color = 'primary' }) => {
  const colorMap = {
    primary: 'bg-gradient-to-r from-primary to-secondary',
    success: 'bg-success',
    zinc: 'bg-zinc-400'
  };

  const activeColor = colorMap[color] || colorMap['primary'];

  return (
    <div className={`w-full bg-zinc-800/80 h-2 rounded-full overflow-hidden border border-border ${className}`}>
      <div
        className={`${activeColor} h-full rounded-full transition-all duration-1000 ease-out`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};

export default Progress;

import React from 'react';

export const Slider = ({
  min = 0,
  max = 100,
  step = 1,
  value,
  onChange,
  className = '',
  label,
  valueDisplay
}) => {
  return (
    <div className={`flex flex-col space-y-2 w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-muted">{label}</span>
          {valueDisplay && <span className="text-xs text-primary font-semibold">{valueDisplay}</span>}
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-secondary focus:outline-none transition-all"
      />
    </div>
  );
};

export default Slider;

import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Select = ({
  options = [],
  value,
  onChange,
  className = '',
  label,
  placeholder = 'Select option'
}) => {
  return (
    <div className={`flex flex-col space-y-1.5 w-full relative ${className}`}>
      {label && (
        <label className="text-xs font-medium text-muted">{label}</label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full glass-input appearance-none pr-10 cursor-pointer text-sm font-medium"
        >
          {placeholder && <option value="" disabled className="bg-background text-muted">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-background text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-muted">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default Select;

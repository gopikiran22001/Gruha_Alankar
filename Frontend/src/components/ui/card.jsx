import React from 'react';

export const Card = ({ className = '', children, glow = false, ...props }) => {
  return (
    <div
      className={`glass-card ${glow ? 'shadow-glow border-border' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`p-5 flex flex-col space-y-1.5 border-b border-border ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={`text-base font-semibold tracking-tight text-white ${className}`} {...props}>
    {children}
  </h3>
);

export const CardDescription = ({ className = '', children, ...props }) => (
  <p className={`text-xs text-muted ${className}`} {...props}>
    {children}
  </p>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div className={`p-5 ${className}`} {...props}>
    {children}
  </div>
);

export const CardFooter = ({ className = '', children, ...props }) => (
  <div className={`p-5 pt-0 flex items-center justify-between border-t border-border mt-5 ${className}`} {...props}>
    {children}
  </div>
);

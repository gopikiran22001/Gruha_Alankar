import React from 'react';
import { motion } from 'framer-motion';

export const Button = React.forwardRef(({
  className = '',
  variant = 'primary', // primary | secondary | glass | outline | ghost
  size = 'md', // sm | md | lg
  loading = false,
  children,
  icon,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all focus:outline-none focus:ring-1 focus:ring-primary/50 disabled:opacity-50 disabled:cursor-not-allowed select-none gap-2';

  const variants = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white shadow-glow hover:brightness-110 active:scale-98',
    secondary: 'bg-zinc-800 text-white hover:bg-zinc-700 border border-border active:scale-98',
    glass: 'glass-panel text-white hover:bg-white/10 active:scale-98 border border-border',
    outline: 'border border-primary/40 bg-transparent text-primary hover:bg-primary/10 active:scale-98',
    ghost: 'text-muted hover:text-primary hover:bg-white/5'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: props.disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: props.disabled || loading ? 1 : 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={props.disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon ? (
        <span className="flex-shrink-0 text-current">{icon}</span>
      ) : null}
      <span>{children}</span>
    </motion.button>
  );
});

Button.displayName = 'Button';
export default Button;

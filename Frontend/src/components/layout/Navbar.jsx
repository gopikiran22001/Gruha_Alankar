import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useUiStore } from '../../store/uiStore';
import { Sparkles, Menu, Bell, User, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { toggleMobileNav, toggleCopilot } = useUiStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-16 border-b border-border bg-background/60 backdrop-blur-md px-4 md:px-6 flex items-center justify-between sticky top-0 z-30 select-none">
      
      {/* Brand logo */}
      <div className="flex items-center gap-2">
        {/* Mobile menu toggle */}
        {isAuthenticated && (
          <button
            onClick={toggleMobileNav}
            className="p-1.5 rounded-lg text-muted hover:text-primary hover:bg-white/5 md:hidden mr-1"
          >
            <Menu size={20} />
          </button>
        )}
        
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white shadow-glow">
            <Sparkles size={16} />
          </div>
          <span className="text-sm font-bold tracking-wider text-gradient uppercase">
            Gruha Alankara
          </span>
        </Link>
      </div>

      {/* Action triggers and user controls */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            {/* Sync system notification icon */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={toggleCopilot}
              className="p-2 text-muted hover:text-primary hover:bg-white/5 rounded-lg border border-border relative"
            >
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-primary" />
            </motion.button>

            {/* Profile trigger */}
            <Link to="/profile" className="flex items-center gap-2.5 pl-3 border-l border-border group">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-border bg-zinc-800">
                <img src={user?.avatar} alt={user?.name} className="w-full h-full object-cover" />
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white group-hover:text-primary transition-colors leading-none">
                  {user?.name}
                </p>
                <span className="text-[9px] text-muted font-bold block mt-0.5">Tier: Enterprise</span>
              </div>
            </Link>

            {/* Logout button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleLogout}
              className="p-2 text-muted hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors ml-1"
              title="Logout session"
            >
              <LogOut size={16} />
            </motion.button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/login" className="text-xs font-semibold text-muted hover:text-primary px-3 py-2 transition-colors">
              Login
            </Link>
            <Link to="/register" className="text-xs font-semibold bg-primary text-white hover:bg-primary-hover px-4 py-2 rounded-lg transition-all shadow-glow">
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

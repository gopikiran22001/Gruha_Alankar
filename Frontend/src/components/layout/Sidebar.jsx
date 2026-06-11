import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUiStore } from '../../store/uiStore';
import {
  LayoutDashboard,
  Sparkles,
  Camera,
  Activity,
  ShoppingBag,
  Clock,
  FolderKanban,
  MessageSquare,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Sidebar = () => {
  const location = useLocation();
  const {
    sidebarCollapsed,
    toggleSidebar,
    mobileNavOpen,
    toggleMobileNav
  } = useUiStore();

  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Design Studio', path: '/design-studio', icon: Sparkles },
    { name: 'Live Camera', path: '/camera', icon: Camera },
    { name: 'AI Diagnostics', path: '/ai-analysis', icon: Activity },
    { name: 'Furniture Catalog', path: '/catalog', icon: ShoppingBag },
    { name: 'Bookings Timeline', path: '/booking', icon: Clock },
    { name: 'Saved Projects', path: '/projects', icon: FolderKanban },
    { name: 'Deep Assistant', path: '/assistant', icon: MessageSquare },
    { name: 'Profile Preference', path: '/profile', icon: User },
    { name: 'Account Settings', path: '/settings', icon: Settings }
  ];

  const getLinkClass = (isActive) => {
    return `flex items-center gap-3.5 px-4 py-3 rounded-lg text-xs font-semibold select-none transition-all duration-300 border ${
      isActive
        ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-border text-white shadow-sm'
        : 'border-transparent text-muted hover:text-primary hover:bg-white/5'
    }`;
  };

  return (
    <>
      {/* DESKTOP SIDEBAR */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? '72px' : '240px' }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="hidden md:flex flex-col border-r border-border bg-background/40 backdrop-blur-md sticky top-16 h-[calc(100vh-64px)] z-20 justify-between select-none"
      >
        <div className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={getLinkClass(isActive)}
                title={sidebarCollapsed ? item.name : ''}
              >
                <Icon size={16} className={`flex-shrink-0 ${isActive ? 'text-primary' : 'text-muted group-hover:text-primary'}`} />
                {!sidebarCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="truncate"
                  >
                    {item.name}
                  </motion.span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Collapse toggle footer */}
        <div className="p-4 border-t border-border bg-background/20">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 rounded-lg text-muted hover:text-primary hover:bg-white/5 transition-colors border border-border"
          >
            {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </motion.aside>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileNavOpen && (
          <div className="fixed inset-0 z-50 md:hidden flex select-none">
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileNav}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Slide-out drawer menu */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-72 max-w-[80vw] bg-surface border-r border-border h-full flex flex-col justify-between p-5 z-10 shadow-premium"
            >
              <div className="space-y-6">
                {/* Header brand details */}
                <div className="flex justify-between items-center border-b border-border pb-4">
                  <span className="text-sm font-bold tracking-wider text-gradient uppercase">Navigation</span>
                  <button
                    onClick={toggleMobileNav}
                    className="p-1 rounded-lg text-muted hover:text-primary hover:bg-white/5"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* List items */}
                <div className="space-y-1.5 overflow-y-auto max-h-[70vh]">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={toggleMobileNav}
                        className={getLinkClass(isActive)}
                      >
                        <Icon size={16} className={`flex-shrink-0 ${isActive ? 'text-primary' : 'text-muted'}`} />
                        <span>{item.name}</span>
                      </NavLink>
                    );
                  })}
                </div>
              </div>

              {/* Version block info */}
              <div className="text-[10px] text-muted font-bold uppercase tracking-wider border-t border-border pt-4 text-center">
                Gruha Alankara v1.0.0
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;

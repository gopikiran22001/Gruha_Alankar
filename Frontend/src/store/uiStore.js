import { create } from 'zustand';

export const useUiStore = create((set) => ({
  sidebarCollapsed: false,
  copilotOpen: false,
  mobileNavOpen: false,
  theme: 'dark',

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  toggleCopilot: () => set((state) => ({ copilotOpen: !state.copilotOpen })),
  setCopilotOpen: (open) => set({ copilotOpen: open }),
  toggleMobileNav: () => set((state) => ({ mobileNavOpen: !state.mobileNavOpen })),
  setTheme: (theme) => set({ theme })
}));

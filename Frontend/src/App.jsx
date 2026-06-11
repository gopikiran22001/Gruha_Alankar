import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Layout components
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import CopilotSidebar from './components/layout/CopilotSidebar';

// Pages
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import DesignStudioPage from './pages/DesignStudioPage';
import CameraPage from './pages/CameraPage';
import AiAnalysisPage from './pages/AiAnalysisPage';
import CatalogPage from './pages/CatalogPage';
import BookingPage from './pages/BookingPage';
import ProjectsPage from './pages/ProjectsPage';
import AssistantPage from './pages/AssistantPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Wrapper that enforces private login access but loads Navbar & Sidebar shells
const LayoutWrapper = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuthStore();
  const location = useLocation();

  const isPublicPage = ['/', '/login', '/register'].includes(location.pathname);

  // Loading state with a beautiful glassmorphic layout
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background relative select-none">
        <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />
        <div className="flex flex-col items-center space-y-4 z-10">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-primary to-rose-500 flex items-center justify-center text-white shadow-glow">
            <svg className="animate-spin h-7 w-7 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <div className="text-center">
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Gruha Alankara</h3>
            <p className="text-[10px] text-muted mt-1.5 font-medium">Synchronizing design workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  // Redirect to login if private page and not authenticated
  if (!isAuthenticated && !isPublicPage) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to dashboard if authenticated and trying to view public login/register
  if (isAuthenticated && ['/login', '/register'].includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Header navbar */}
      <Navbar />

      <div className="flex flex-1 relative">
        {/* Left Drawer sidebar - only visible when logged in */}
        {isAuthenticated && !isPublicPage && <Sidebar />}

        {/* Central main workspace area */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Right Sidebar Global AI Companion (Copilot) - Active on all routes */}
      {isAuthenticated && <CopilotSidebar />}
    </div>
  );
};

export const App = () => {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  React.useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <Router>
      <LayoutWrapper>
        <Routes>
          {/* Public Routing */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Logged in Routing */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/design-studio" element={<DesignStudioPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/ai-analysis" element={<AiAnalysisPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* 404 Fallback routing */}
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </LayoutWrapper>
    </Router>
  );
};

export default App;

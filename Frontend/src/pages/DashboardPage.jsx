import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProjectStore } from '../store/projectStore';
import { useBookingStore } from '../store/bookingStore';
import StatCard from '../components/shared/StatCard';
import ProjectCard from '../components/shared/ProjectCard';
import Button from '../components/ui/button';
import { Sparkles, Camera, Plus, ArrowRight, ShieldCheck, Activity, Lightbulb, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { projects, deleteProject, duplicateProject, fetchProjects } = useProjectStore();
  const { bookings, fetchBookings } = useBookingStore();

  // Fetch live data on mount
  useEffect(() => {
    fetchProjects();
    fetchBookings();
  }, [fetchProjects, fetchBookings]);

  const handleViewProject = (proj) => {
    navigate('/design-studio');
  };

  // Calculate statistics
  const totalProjectsCount = projects.length;
  const activeBookingsCount = bookings.filter((b) => b.status !== 'Delivered').length;
  const averageSpaceScore = Math.round(
    projects.reduce((acc, p) => acc + (p.analysis?.score || 0), 0) / (totalProjectsCount || 1)
  );

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto select-none">
      
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-6 rounded-xl relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-1.5 z-10">
          <h2 className="text-xl font-bold tracking-tight text-white">
            Welcome back, {user?.name || 'Designer'}! ✨
          </h2>
          <p className="text-xs text-muted max-w-md leading-relaxed">
            Your spatial coordinates are synced. You have {totalProjectsCount} active layouts on catalog records. Ready to redesign?
          </p>
        </div>

        <div className="flex gap-2.5 z-10">
          <Link to="/camera">
            <Button variant="glass" size="sm" icon={<Camera size={14} />}>
              Scan Room
            </Button>
          </Link>
          <Link to="/design-studio">
            <Button variant="primary" size="sm" icon={<Plus size={14} />}>
              New Design
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Analytics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Saved Projects"
          value={totalProjectsCount}
          iconName="FolderKanban"
          subtext="Total design workspaces"
          trend={{ value: '+1 new', positive: true }}
        />
        <StatCard
          title="Active Orders"
          value={activeBookingsCount}
          iconName="ShoppingBag"
          subtext="Items in transit/processing"
          trend={{ value: 'Tracking active', positive: true }}
        />
        <StatCard
          title="Avg Spatial Score"
          value={`${averageSpaceScore}%`}
          iconName="Activity"
          subtext="Across all layouts"
          trend={{ value: 'Highly Optimized', positive: true }}
        />
        <StatCard
          title="Diagnostic Lux Index"
          value="280 Lux"
          iconName="Sun"
          subtext="Natural light levels average"
          trend={{ value: 'Adequate', positive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Side: Recent Projects Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Recent Projects</h3>
            <Link to="/projects" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              <span>View All</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleViewProject}
                onDelete={deleteProject}
                onDuplicate={duplicateProject}
              />
            ))}
          </div>
        </div>

        {/* Right Side: AI Insights Panel */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Copilot Insights</h3>
          
          <div className="glass-panel p-5 rounded-xl space-y-4 relative overflow-hidden">
            {/* Insights alerts */}
            <div className="flex gap-3 items-start border-b border-border pb-3.5">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex-shrink-0">
                <AlertTriangle size={15} />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-white">Spatial clearance conflict</h5>
                <p className="text-[11px] text-muted leading-relaxed">
                  Metropolitan Studio table measures 38cm clearance from sofa center. Increase clearance to 45cm to improve rating score.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start border-b border-border pb-3.5">
              <div className="p-2 rounded-lg bg-primary/10 border border-border text-primary flex-shrink-0">
                <Lightbulb size={15} />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-white">Style Recommendation</h5>
                <p className="text-[11px] text-muted leading-relaxed">
                  Sunset Heights Natural Light is excellent. Consider switching style preset to Scandinavian to capture timber tones.
                </p>
              </div>
            </div>

            <div className="flex gap-3 items-start">
              <div className="p-2 rounded-lg bg-success/10 border border-success/20 text-success flex-shrink-0">
                <ShieldCheck size={15} />
              </div>
              <div className="space-y-0.5">
                <h5 className="text-xs font-bold text-white">Logistics Update</h5>
                <p className="text-[11px] text-muted leading-relaxed">
                  Order #book-101 has cleared production checks and is currently departing warehouse routing.
                </p>
              </div>
            </div>

            <Link to="/ai-analysis" className="block text-center mt-2.5">
              <Button variant="glass" size="sm" className="w-full text-xs">
                Open Full Diagnostics
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardPage;

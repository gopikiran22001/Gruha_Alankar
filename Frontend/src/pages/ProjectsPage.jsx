import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjectStore } from '../store/projectStore';
import ProjectCard from '../components/shared/ProjectCard';
import { FolderKanban, Search, Plus } from 'lucide-react';
import Button from '../components/ui/button';

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, deleteProject, duplicateProject, fetchProjects } = useProjectStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Load projects from backend on mount
  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleViewProject = () => {
    navigate('/design-studio');
  };

  const handleDuplicate = (id) => {
    duplicateProject(id);
    alert('Project successfully duplicated!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to permanently delete this project draft?')) {
      deleteProject(id);
    }
  };

  const filteredProjects = projects.filter((p) => {
    const name = (p.name || '').toLowerCase();
    const style = (p.style || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return name.includes(q) || style.includes(q);
  });

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-6xl mx-auto select-none">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <FolderKanban size={18} className="text-primary" />
            <span>My Projects Archive</span>
          </h2>
          <p className="text-xs text-muted">Access saved blueprints, modify style rules, and manage draft duplicates</p>
        </div>

        <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={() => navigate('/design-studio')}>
          Create Project
        </Button>
      </div>

      {/* Projects Search bar */}
      <div className="glass-panel p-4 rounded-xl flex items-center gap-4 max-w-md">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search projects by name or style (e.g. Luxury)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full glass-input pl-10 text-xs py-2"
          />
          <Search size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
        </div>
      </div>

      {/* Grid view */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onView={handleViewProject}
            onDelete={handleDelete}
            onDuplicate={handleDuplicate}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="glass-panel p-8 rounded-xl text-center text-muted text-xs">
          No saved projects match search credentials.
        </div>
      )}

    </div>
  );
};

export default ProjectsPage;

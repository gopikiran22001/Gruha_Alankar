import React from 'react';
import { Layers, Calendar, Trash2, Copy, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const ProjectCard = ({ project, onView, onDelete, onDuplicate }) => {
  return (
    <div className="glass-card overflow-hidden flex flex-col justify-between h-full group">
      {/* Project image thumbnail */}
      <div className="relative aspect-video bg-background overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Style Badge overlay */}
        <div className="absolute top-3 left-3 bg-surface/85 border border-border text-[9px] font-bold uppercase tracking-wider text-primary px-2.5 py-1 rounded-md backdrop-blur-md">
          {project.style}
        </div>

        {/* Space score overlay */}
        {project.analysis && (
          <div className="absolute bottom-3 right-3 bg-surface/90 border border-border px-2 py-1 rounded-md text-[9px] font-bold text-white flex items-center gap-1.5 backdrop-blur-md">
            <Activity size={10} className="text-success" />
            <span>Score: {project.analysis.score}%</span>
          </div>
        )}
      </div>

      {/* Info Body */}
      <div className="p-4 flex flex-col space-y-2">
        <h4 className="text-sm font-bold text-white tracking-tight line-clamp-1">{project.name}</h4>
        
        <div className="flex items-center gap-4 text-[10px] text-muted">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {project.date}
          </span>
          <span className="flex items-center gap-1">
            <Layers size={11} />
            Budget: <strong className="text-text font-semibold">{project.budget}</strong>
          </span>
        </div>

        {/* Short Analysis summary */}
        {project.analysis && (
          <div className="bg-background/40 border border-border rounded-lg p-2.5 mt-2 flex flex-col space-y-1">
            <span className="text-[9px] font-semibold text-muted uppercase tracking-wider">AI Diagnostics</span>
            <div className="flex justify-between text-[10px]">
              <span className="text-muted">Room Type:</span>
              <span className="text-white font-medium">{project.analysis.roomType}</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-muted">Objects Detected:</span>
              <span className="text-white font-medium truncate max-w-[120px]">
                {project.analysis.detectedObjects.join(', ')}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Action footer */}
      <div className="p-4 pt-0 mt-3 border-t border-border flex justify-between items-center gap-2">
        <div className="flex gap-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onDuplicate(project.id)}
            className="p-2 text-muted hover:text-primary hover:bg-white/5 border border-border rounded-lg transition-colors"
            title="Duplicate layout draft"
          >
            <Copy size={13} />
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(project.id)}
            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/5 border border-red-500/10 rounded-lg transition-colors"
            title="Delete project"
          >
            <Trash2 size={13} />
          </motion.button>
        </div>

        <motion.button
          whileHover={{ x: 2 }}
          onClick={() => onView(project)}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary hover:text-secondary transition-colors"
        >
          <span>Open Studio</span>
          <ArrowRight size={12} />
        </motion.button>
      </div>
    </div>
  );
};

export default ProjectCard;

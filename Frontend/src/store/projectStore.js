/**
 * projectStore.js — Projects State
 *
 * Backed by the real /api/projects endpoints.
 * Falls back gracefully when not authenticated or backend is unreachable.
 */
import { create } from 'zustand';
import { projectsApi } from '../services/projectsApi';

export const useProjectStore = create((set, get) => ({
  projects: [],
  isLoading: false,
  error: null,

  // ── Fetch all projects for the current user ──
  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await projectsApi.list();
      const serverProjects = (result.data?.projects || []).map((p) => ({
        id: p._id || p.project_id,
        name: p.name,
        description: p.description || '',
        roomType: p.room_type || '',
        style: p.style || '',
        budget: p.budget || null,
        status: p.status || 'active',
        date: p.created_at
          ? new Date(p.created_at).toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0],
        designs: p.designs || [],
        bookings: p.bookings || [],
        // Preserve any extra analysis/preview fields if present
        analysis: p.analysis || null,
        thumbnail: p.thumbnail || null,
      }));
      set({ projects: serverProjects, isLoading: false });
    } catch (error) {
      // Not authenticated yet or backend unreachable — keep current list
      set({ isLoading: false, error: null });
    }
  },

  // ── Create a new project via backend ──
  addProject: async (projectData) => {
    try {
      const result = await projectsApi.create({
        name: projectData.name || 'Untitled Project',
        description: projectData.description || '',
        roomType: projectData.roomType || projectData.room_type || '',
        style: projectData.style || '',
        budget: projectData.budget || null,
      });

      const newProject = {
        id: result.data?.project_id || `proj-${Date.now()}`,
        name: result.data?.name || projectData.name || 'Untitled Project',
        description: result.data?.description || '',
        roomType: result.data?.room_type || '',
        style: result.data?.style || '',
        budget: result.data?.budget || null,
        status: result.data?.status || 'active',
        date: new Date().toISOString().split('T')[0],
        designs: [],
        bookings: [],
        analysis: null,
        thumbnail: null,
      };

      set((state) => ({ projects: [newProject, ...state.projects] }));
      return newProject;
    } catch (error) {
      // Optimistic local add as fallback
      const fallback = {
        id: `proj-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        status: 'active',
        designs: [],
        bookings: [],
        analysis: null,
        thumbnail: null,
        ...projectData,
      };
      set((state) => ({ projects: [fallback, ...state.projects] }));
      return fallback;
    }
  },

  // ── Delete project locally (no backend delete endpoint yet) ──
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),

  // ── Duplicate a project locally ──
  duplicateProject: (id) =>
    set((state) => {
      const src = state.projects.find((p) => p.id === id);
      if (!src) return {};
      const copy = {
        ...src,
        id: `proj-${Date.now()}`,
        name: `${src.name} (Copy)`,
        date: new Date().toISOString().split('T')[0],
      };
      return { projects: [copy, ...state.projects] };
    }),

  // ── Update a project locally after edit ──
  saveProject: (updatedProject) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === updatedProject.id ? { ...p, ...updatedProject } : p
      ),
    })),
}));

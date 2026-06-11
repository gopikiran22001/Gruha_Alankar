/**
 * projectsApi.js — Projects Endpoints
 *
 * GET  /projects           — List user projects
 * POST /projects           — Create a new project
 * GET  /projects/:id       — Get a single project
 */
import apiClient from './apiClient';

export const projectsApi = {
  /**
   * List all projects for the current authenticated user.
   */
  list: async (limit = 20, skip = 0) => {
    const response = await apiClient.get('/projects', { params: { limit, skip } });
    return response.data;
  },

  /**
   * Create a new design project.
   */
  create: async ({ name, description, roomType, style, budget }) => {
    const response = await apiClient.post('/projects', {
      name,
      description,
      room_type: roomType,
      style,
      budget,
    });
    return response.data;
  },

  /**
   * Get a single project by ID.
   */
  getById: async (projectId) => {
    const response = await apiClient.get(`/projects/${projectId}`);
    return response.data;
  },
};

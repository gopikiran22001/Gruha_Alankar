/**
 * analysisApi.js — Room Diagnostics and Analysis Endpoints
 *
 * POST /vision/analyze — Full room analysis (colors, lighting, objects)
 */
import apiClient from './apiClient';

export const analysisApi = {
  /**
   * Get comprehensive room analysis stats.
   * Sends the room image for full_analysis via the Vision Agent.
   */
  getRoomStats: async (imageFile) => {
    if (!imageFile) {
      throw new Error('Image file is required for room analysis');
    }

    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('task_type', 'full_analysis');

    const response = await apiClient.post('/vision/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
    return response.data;
  },

  /**
   * Analyze lighting conditions only.
   */
  analyzeLighting: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('task_type', 'analyze_lighting');

    const response = await apiClient.post('/vision/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },

  /**
   * Extract dominant colors only.
   */
  extractColors: async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('task_type', 'extract_colors');

    const response = await apiClient.post('/vision/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};

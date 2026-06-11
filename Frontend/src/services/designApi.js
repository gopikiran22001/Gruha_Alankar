/**
 * designApi.js — Design Studio Endpoints
 *
 * POST /vision/analyze  — Upload and analyze room image
 * POST /design/generate — Generate design proposals
 */
import apiClient from './apiClient';

export const designApi = {
  /**
   * Upload and analyze a room image via the Vision Agent.
   */
  uploadImage: async (file, taskType = 'full_analysis') => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('task_type', taskType);

    const response = await apiClient.post('/vision/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
    return response.data;
  },

  /**
   * Generate a design proposal via the Design Agent.
   */
  generateDesign: async (style, roomType, preferences = {}, budget = null, context = {}) => {
    const response = await apiClient.post('/design/generate', {
      style,
      room_type: roomType,
      preferences,
      budget,
      context,
      task_type: 'generate_design',
    });
    return response.data;
  },

  /**
   * Complete design studio workflow: analysis + recommendations + render.
   */
  analyzeAndDesign: async (imageFile, style = 'modern', budget = null, roomType = 'living room', generateRender = true) => {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('style', style);
    if (budget) formData.append('budget', budget);
    formData.append('room_type', roomType);
    formData.append('generate_render', generateRender ? 'true' : 'false');

    const response = await apiClient.post('/design-studio/analyze-and-design', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 180000, // 3 mins timeout since AI generation takes time
    });
    return response.data;
  },

  /**
   * Regenerate only the AI render using a new style.
   */
  regenerateRender: async (originalImageUrl, designRecommendations, roomAnalysis) => {
    const response = await apiClient.post('/design-studio/regenerate-render', {
      original_image_path: originalImageUrl,
      design_recommendations: designRecommendations,
      room_analysis: roomAnalysis,
    });
    return response.data;
  },
};

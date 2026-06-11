/**
 * assistantApi.js — Chat / AI Assistant Endpoint
 *
 * POST /chat — Main entry to autonomous agent system
 */
import apiClient from './apiClient';

export const assistantApi = {
  /**
   * Send a chat message to the AI system.
   * Supports text, images, audio, and design constraints.
   */
  sendMessage: async (text, options = {}) => {
    const {
      sessionId,
      chatHistory,
      budget,
      style,
      roomType,
      projectId,
      imageFile,
      audioFile,
    } = options;

    // Use FormData if files are attached, else JSON
    if (imageFile || audioFile) {
      const formData = new FormData();
      formData.append('message', text);
      if (sessionId) formData.append('session_id', sessionId);
      if (budget) formData.append('budget', budget);
      if (style) formData.append('style', style);
      if (roomType) formData.append('room_type', roomType);
      if (projectId) formData.append('project_id', projectId);
      if (imageFile) formData.append('image', imageFile);
      if (audioFile) formData.append('audio', audioFile);

      const response = await apiClient.post('/chat', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 180000, // 3 min for image/audio processing
      });
      return response.data;
    }

    const response = await apiClient.post('/chat', {
      message: text,
      session_id: sessionId,
      chat_history: chatHistory || [],
      budget,
      style,
      room_type: roomType,
      project_id: projectId,
    });
    return response.data;
  },
};

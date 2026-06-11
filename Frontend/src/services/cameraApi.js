/**
 * cameraApi.js — Real-time Camera/Vision Endpoints
 *
 * POST /vision/analyze — Analyze a camera frame
 */
import apiClient from './apiClient';

export const cameraApi = {
  /**
   * Analyze a camera frame (base64 image or Blob).
   */
  analyzeFrame: async (imageBlob, taskType = 'full_analysis') => {
    const formData = new FormData();

    // Support both Blob and base64 string
    if (typeof imageBlob === 'string') {
      // Convert base64 to Blob
      const byteString = atob(imageBlob.split(',')[1] || imageBlob);
      const mimeType = imageBlob.includes('data:') ? imageBlob.split(';')[0].split(':')[1] : 'image/jpeg';
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeType });
      formData.append('image', blob, 'frame.jpg');
    } else {
      formData.append('image', imageBlob, 'frame.jpg');
    }

    formData.append('task_type', taskType);

    const response = await apiClient.post('/vision/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
    return response.data;
  },
};

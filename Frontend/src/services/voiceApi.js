/**
 * voiceApi.js — Voice Endpoints
 *
 * POST /voice/transcribe — Speech-to-text
 * POST /voice/speak      — Text-to-speech (returns audio blob)
 */
import apiClient from './apiClient';

export const voiceApi = {
  /**
   * Transcribe audio to text via Faster Whisper.
   * @param {Blob|File} audioBlob - Audio file to transcribe.
   * @param {string} language - Optional language hint (null = auto-detect).
   */
  transcribe: async (audioBlob, language = null) => {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.wav');
    if (language) formData.append('language', language);

    const response = await apiClient.post('/voice/transcribe', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 60000,
    });
    return response.data;
  },

  /**
   * Convert text to speech via XTTS-v2.
   * Returns an audio Blob for playback.
   * @param {string} text - Text to synthesize.
   * @param {string} language - Language code (default: 'en').
   */
  speak: async (text, language = 'en') => {
    const response = await apiClient.post(
      '/voice/speak',
      { text, language },
      { responseType: 'blob', timeout: 60000 }
    );
    return response.data; // Audio Blob
  },
};

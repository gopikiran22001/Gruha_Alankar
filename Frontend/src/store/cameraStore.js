import { create } from 'zustand';
import { cameraApi } from '../services/cameraApi';

export const useCameraStore = create((set, get) => ({
  isStreaming: false,
  capturedImage: null,
  isAnalyzing: false,
  analysisResult: null,
  error: null,

  startStreaming: () => set({ isStreaming: true, capturedImage: null, analysisResult: null, error: null }),
  stopStreaming: () => set({ isStreaming: false }),
  setCapturedImage: (img) => set({ capturedImage: img, isStreaming: false }),
  clearCaptured: () => set({ capturedImage: null, analysisResult: null, isStreaming: true, error: null }),

  /**
   * Run vision analysis on the captured image via the real Vision Agent.
   */
  runAnalysis: async () => {
    const capturedImage = get().capturedImage;
    if (!capturedImage) return;

    set({ isAnalyzing: true, analysisResult: null, error: null });

    try {
      const result = await cameraApi.analyzeFrame(capturedImage, 'full_analysis');
      const data = result.data || {};

      // Map backend response to the UI's expected format
      const analysis = {
        roomType: data.room_description?.caption || data.room_description?.room_type || 'Room',
        lightingScore: data.lighting_analysis?.brightness
          ? Math.round(data.lighting_analysis.brightness / 2.55)
          : 75,
        lightingQuality: data.lighting_analysis?.classification
          ? `${data.lighting_analysis.classification} lighting`
          : 'Unknown',
        spaceUtilization: data.segmentation?.space_utilization || 80,
        detectedObjects: (data.detected_objects?.detections || []).map((obj) => ({
          label: obj.label || obj.class_name,
          confidence: obj.confidence ? `${Math.round(obj.confidence * 100)}%` : 'N/A',
          position: obj.bbox
            ? { x: `${obj.bbox[0]}%`, y: `${obj.bbox[1]}%`, w: `${obj.bbox[2]}%`, h: `${obj.bbox[3]}%` }
            : {},
        })),
        dominantColors: (data.color_analysis?.dominant_colors || []).map((c) => ({
          hex: c.hex,
          percentage: c.percentage,
        })),
        warnings: [],
        suggestions: data.lighting_analysis?.recommendation
          ? [data.lighting_analysis.recommendation]
          : [],
      };

      set({ isAnalyzing: false, analysisResult: analysis });
    } catch (error) {
      const message = error.response?.data?.message || 'Vision analysis failed. Please try again.';
      set({ isAnalyzing: false, error: message });
    }
  },
}));

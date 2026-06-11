import { create } from 'zustand';
import { designApi } from '../services/designApi';

// Fallback style palettes for offline/preview mode
const STYLE_FALLBACKS = {
  modern: { palette: ['#09090B', '#F4F4F5', '#E11D48', '#A1A1AA'] },
  minimalist: { palette: ['#FFFFFF', '#E4E4E7', '#27272A', '#A1A1AA'] },
  scandinavian: { palette: ['#F4F4F5', '#E4E4E7', '#D4D4D8', '#3F3F46'] },
  luxury: { palette: ['#09090B', '#1E1B4B', '#F59E0B', '#E2E8F0'] },
  industrial: { palette: ['#18181B', '#27272A', '#7F1D1D', '#71717A'] },
};

export const useDesignStore = create((set, get) => ({
  uploadedImage: null,
  uploadedImageFile: null,
  originalImageUrl: null,
  selectedStyle: 'modern',
  budget: '',
  roomType: 'living room',
  isGenerating: false,
  activeDesign: null,
  roomAnalysis: null,
  generatedImageUrl: null,
  comparisonImageUrl: null,
  error: null,

  setUploadedImage: (img, file = null) =>
    set({ 
      uploadedImage: img, 
      uploadedImageFile: file, 
      originalImageUrl: null,
      activeDesign: null, 
      roomAnalysis: null,
      generatedImageUrl: null,
      comparisonImageUrl: null,
      error: null
    }),
  setSelectedStyle: (style) => set({ selectedStyle: style }),
  setBudget: (budget) => set({ budget }),
  setRoomType: (roomType) => set({ roomType }),

  /**
   * Complete design studio workflow:
   * 1. Upload image
   * 2. Vision analysis
   * 3. Design recommendations
   * 4. Generate AI render with furniture
   */
  generateDesign: async () => {
    const style = get().selectedStyle;
    const imageFile = get().uploadedImageFile;
    const budget = get().budget;
    const roomType = get().roomType;
    
    set({ isGenerating: true, error: null, activeDesign: null, generatedImageUrl: null, comparisonImageUrl: null });

    try {
      // Use the complete design studio workflow endpoint
      if (imageFile) {
        const budgetValue = budget && !isNaN(parseFloat(budget)) ? parseFloat(budget) : null;
        const result = await designApi.analyzeAndDesign(imageFile, style, budgetValue, roomType, true);
        
        // Extract all data from response
        const { 
          room_analysis, 
          design_recommendations, 
          generated_image_url,
          comparison_image_url,
          original_image_url,
          summary
        } = result;

        set({ roomAnalysis: room_analysis, originalImageUrl: original_image_url });

        // Build active design from recommendations
        const designData = design_recommendations || {};
        const colorScheme = designData.color_scheme || {};
        const palette = colorScheme.primary
          ? [colorScheme.primary.hex, colorScheme.secondary?.hex, colorScheme.accent?.hex, colorScheme.neutral?.hex].filter(Boolean)
          : STYLE_FALLBACKS[style]?.palette || STYLE_FALLBACKS.modern.palette;

        const activeDesign = {
          palette,
          furniture: (designData.furniture_list || []).map((item) => ({
            name: item.item,
            price: item.estimated_price_inr ? `₹${item.estimated_price_inr.toLocaleString()}` : 'N/A',
            link: '/catalog',
            priority: item.priority,
            placement: item.placement,
          })),
          decor: (designData.decor_suggestions || []).map((item) =>
            typeof item === 'string' ? item : `${item.item}: ${item.description}`
          ),
          space: (designData.layout_tips || []).join(' '),
          budget: designData.estimated_total_inr
            ? `₹${designData.estimated_total_inr.toLocaleString()}`
            : 'N/A',
          explanation: designData.design_rationale || designData.style_description || summary || '',
          raw: designData,
        };

        set({ 
          isGenerating: false, 
          activeDesign,
          generatedImageUrl: generated_image_url,
          comparisonImageUrl: comparison_image_url
        });
      } else {
        throw new Error('Please upload a room image first');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Design generation failed. Please try again.';
      set({ isGenerating: false, error: message });
    }
  },

  /**
   * Regenerate only the render for style toggles
   */
  regenerateDesign: async (newStyle) => {
    const originalImageUrl = get().originalImageUrl;
    const roomAnalysis = get().roomAnalysis;
    const activeDesign = get().activeDesign;

    if (!originalImageUrl) {
      set({ error: 'Please upload and generate an initial design first' });
      return;
    }

    set({ isGenerating: true, error: null });

    try {
      const designRecommendations = activeDesign ? activeDesign.raw : {};
      
      const response = await designApi.regenerateRender(
        originalImageUrl,
        {
          ...designRecommendations,
          style: newStyle
        },
        roomAnalysis
      );

      if (response.status === 'success') {
        set({
          selectedStyle: newStyle,
          generatedImageUrl: response.generated_image_url,
          isGenerating: false
        });
      } else {
        throw new Error(response.message || 'Regeneration failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Regeneration failed. Please try again.';
      set({ isGenerating: false, error: message });
    }
  },

  resetStudio: () =>
    set({
      uploadedImage: null,
      uploadedImageFile: null,
      originalImageUrl: null,
      activeDesign: null,
      roomAnalysis: null,
      selectedStyle: 'modern',
      budget: '',
      roomType: 'living room',
      generatedImageUrl: null,
      comparisonImageUrl: null,
      error: null,
    }),
}));

/**
 * furnitureApi.js — Furniture Search & Catalog Endpoints
 *
 * POST /furniture/search — AI-powered furniture recommendations
 */
import apiClient from './apiClient';
import { CATALOG_PRODUCTS } from '../utils/mockData';

export const furnitureApi = {
  /**
   * AI-powered furniture search and recommendations.
   */
  search: async (style, roomType, criteria = [], budget = null, context = {}) => {
    const response = await apiClient.post('/furniture/search', {
      style,
      room_type: roomType,
      criteria,
      budget,
      context,
      task_type: 'recommend_products',
    });
    return response.data;
  },

  /**
   * Get all catalog products (local fallback for browsing).
   * This remains client-side until a dedicated catalog API is added.
   */
  getAll: async () => {
    return { data: CATALOG_PRODUCTS };
  },

  /**
   * Get a single product by ID (local fallback).
   */
  getById: async (id) => {
    const product = CATALOG_PRODUCTS.find((p) => p.id === id);
    return { data: product || CATALOG_PRODUCTS[0] };
  },
};

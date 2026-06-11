/**
 * budgetApi.js — Budget Calculation Endpoints
 *
 * POST /budget/calculate — AI-powered budget estimation and optimization
 */
import apiClient from './apiClient';

export const budgetApi = {
  /**
   * Estimate project budget from design plans and product lists.
   */
  calculate: async (budget, categories = [], products = [], context = {}) => {
    const response = await apiClient.post('/budget/calculate', {
      budget,
      categories,
      products,
      context,
      task_type: 'estimate_budget',
    });
    return response.data;
  },

  /**
   * Generate category-wise budget breakdown.
   */
  breakdown: async (budget, categories = []) => {
    const response = await apiClient.post('/budget/calculate', {
      budget,
      categories,
      task_type: 'generate_breakdown',
    });
    return response.data;
  },

  /**
   * Optimize budget with cost-saving suggestions.
   */
  optimize: async (budget, targetBudget, products = []) => {
    const response = await apiClient.post('/budget/calculate', {
      budget,
      target_budget: targetBudget,
      products,
      task_type: 'optimize_budget',
    });
    return response.data;
  },
};

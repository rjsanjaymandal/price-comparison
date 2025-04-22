import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

/**
 * Search for products and compare prices
 * @param {string} query - The search term
 * @returns {Promise} - Promise with search results
 */
export const compareProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/compare`, {
      params: { query }
    });
    return response.data;
  } catch (error) {
    console.error('Error comparing products:', error);
    throw error;
  }
};

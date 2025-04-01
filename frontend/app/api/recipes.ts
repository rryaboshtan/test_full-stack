import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getRecipes = async (filter?: {
  ingredient?: string;
  country?: string;
  category?: string;
}) => {
  let url = API_URL || '';
  if (filter?.ingredient) url += `?ingredient=${filter.ingredient}`;
  if (filter?.country) url += `?country=${filter.country}`;
  if (filter?.category) url += `?category=${filter.category}`;

  const response = await axios.get(url);
  return response.data.meals || [];
};

export const getRecipeById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.meals[0] || null;
};

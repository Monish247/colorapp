import { Color, ColorFormData } from '../interfaces';

const API_URL = 'http://localhost:5000/api'; // Adjust this to your API URL

export const fetchColors = async (): Promise<Color[]> => {
  const response = await fetch(`${API_URL}/colors`);
  if (!response.ok) {
    throw new Error('Failed to fetch colors');
  }
  return response.json();
};

export const addColor = async (colorData: ColorFormData): Promise<Color> => {
  const response = await fetch(`${API_URL}/colors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(colorData),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add color');
  }
  
  return response.json();
};
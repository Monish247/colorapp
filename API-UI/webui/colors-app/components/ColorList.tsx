import { useEffect, useState } from 'react';
import { Color } from '../interfaces';
import { fetchColors } from '../services/api';

const ColorList = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getColors = async () => {
      try {
        const data = await fetchColors();
        setColors(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch colors. Please try again later.' + err);
        setLoading(false);
      }
    };

    getColors();
  }, []);

  if (loading) return <div>Loading colors...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="color-list">
      <h2>Available Colors</h2>
      {colors.length === 0 ? (
        <p>No colors found. Add some below!</p>
      ) : (
        <div className="grid">
          {colors.map((color) => (
            <div key={color.id} className="color-card">
              <div 
                className="color-sample" 
                style={{ backgroundColor: color.hexCode }}
              />
              <div className="color-details">
                <h3>{color.name}</h3>
                <p>{color.hexCode}</p>
                <p className="date">Added: {new Date(color.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorList;
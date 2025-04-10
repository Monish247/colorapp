import { useState } from 'react';
import { ColorFormData } from '../interfaces';
import { addColor } from '../services/api';

interface ColorFormProps {
  onColorAdded: () => void;
}

const ColorForm = ({ onColorAdded }: ColorFormProps) => {
  const [formData, setFormData] = useState<ColorFormData>({
    name: '',
    hexCode: '#000000',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await addColor(formData);
      setFormData({ name: '', hexCode: '#000000' });
      onColorAdded();
    } catch (err) {
      setError('Failed to add color. Please try again.' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="color-form">
      <h2>Add New Color</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Color Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="hexCode">Color (HEX Code)</label>
          <div className="color-picker">
            <input
              type="color"
              id="hexCode"
              name="hexCode"
              value={formData.hexCode}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="hexCode"
              value={formData.hexCode}
              onChange={handleChange}
              pattern="^#[0-9A-Fa-f]{6}$"
              required
            />
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Color'}
        </button>
      </form>
    </div>
  );
};

export default ColorForm;
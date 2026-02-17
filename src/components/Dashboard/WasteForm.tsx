import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

export function WasteForm() {
  const [formData, setFormData] = useState({
    waste_amount: '',
    comments: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('waste_records')
        .insert([
          {
            waste_amount: parseFloat(formData.waste_amount),
            comments: formData.comments,
          }
        ]);

      if (error) throw error;

      // Reset form
      setFormData({ waste_amount: '', comments: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Record Waste</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Amount (kg)
          </label>
          <input
            type="number"
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.waste_amount}
            onChange={(e) => setFormData(prev => ({ ...prev, waste_amount: e.target.value }))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Comments
          </label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            value={formData.comments}
            onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`mt-4 w-full py-2 px-4 rounded-md text-white transition-colors ${
          loading
            ? 'bg-blue-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {loading ? 'Saving...' : 'Record Waste'}
      </button>
    </form>
  );
}
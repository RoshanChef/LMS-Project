import { useState } from 'react';
import toast from 'react-hot-toast';
import { create_category } from '../../../services/operations/courseDetailAPI';
import { useSelector } from 'react-redux';

export default function Category_form() {
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const { token } = useSelector(state => state.auth);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = formData;
    if (!name || !description) {
      toast.error('Please fill all the fields');
      return;
    }

    try {
      setLoading(true);
      const res = await create_category(formData, token);
      setFormData({ name: '', description: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[80vw]  mx-auto mt-10 p-6 text-black bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Create New Category</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Category Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-indigo-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter category description"
            className="w-full border text-black border-gray-300 rounded px-4 py-2 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
        >
          {loading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </div>
  );
}

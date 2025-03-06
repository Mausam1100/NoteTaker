import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useSearchParams } from 'react-router-dom';
import api from './api';
import { UserContext } from '../App';

function Home() {
  const { setProgress } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const editId = searchParams.get('noteId');
  const location = useLocation();
  const notes = location.state;

  const [formData, setFormData] = useState({
    topic: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(20);
    try {
      const response = editId
        ? await api.put(`/api/v1/user/save-note/${editId}`, formData)
        : await api.post('/api/v1/user/save-note', formData);
      setProgress(50);
      toast.success(response.data.message);
      setFormData({
        topic: '',
        description: '',
      });
      setProgress(100);
    } catch (error) {
      setProgress(100);
      toast.error(error.response.data.error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (editId) {
      const editNote = notes.find((note) => note._id === editId);
      setFormData({
        topic: editNote.topic,
        description: editNote.description,
      });
    }
  }, [editId]);

  return (
    <div className="min-h-[calc(100vh-65px)] flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 py-10">
      <div className="w-[80%] max-w-[1000px] bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 pb-5">
            {editId ? 'Update Your Note' : 'Create New Note'}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                Topic:
              </label>
              <div className="flex items-center justify-between gap-4 mt-2">
                <input
                  type="text"
                  placeholder="What's the topic?"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  id="topic"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  {editId ? 'Update' : 'Save'}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                name="description"
                placeholder="What's the note?"
                value={formData.description}
                onChange={handleChange}
                id="description"
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={10}
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Home;
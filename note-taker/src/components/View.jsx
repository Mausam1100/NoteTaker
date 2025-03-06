import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Copy } from 'lucide-react';
import toast from 'react-hot-toast';

function View() {
  const { id } = useParams();
  const location = useLocation();
  const allNote = location.state;
  const note = allNote.find((note) => note._id === id);

  function handleCopy(description) {
    navigator.clipboard
      .writeText(description)
      .then(() => {
        toast.success('Copied successfully');
      })
      .catch((err) => {
        toast.error("Couldn't copy");
      });
  }

  return (
    <div className="min-h-[calc(100vh-65px)] bg-gradient-to-r from-blue-50 to-purple-50 flex items-center justify-center py-10">
      <div className="w-[80%] max-w-[1000px] bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 pb-5">
            View Note
          </h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700">
                Topic:
              </label>
              <div className="flex items-center justify-between gap-4 mt-2">
                <input
                  type="text"
                  value={note.topic}
                  name="topic"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-500 bg-gray-100"
                  disabled
                />
                <button
                type='button'
                  onClick={() => handleCopy(note.description)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
                >
                  <Copy size={20} color="white" strokeWidth={1.75} />
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description:
              </label>
              <textarea
                name="description"
                value={note.description}
                className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-500 bg-gray-100"
                rows={10}
                disabled
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default View;
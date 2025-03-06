import React, { useContext } from 'react';
import api from './api';
import toast from 'react-hot-toast';
import { UserContext } from '../App';

function DeleteModal({ setShowModal, deleteId, setNotes }) {
  const { setProgress } = useContext(UserContext);

  const handleDelete = async () => {
    setProgress(20);
    try {
      const response = await api.delete(`/api/v1/user/delete-note/${deleteId}`);
      setProgress(60);
      if (response.status === 200) {
        setNotes((prevNote) => {
          return prevNote.filter((note) => note._id !== deleteId);
        });
        setProgress(100);
        toast.success(response.data.message);
        setShowModal(false);
      }
    } catch (error) {
      setProgress(100);
      toast.error(error.response.data.error.message);
    }
  };

  return (
    <div className="fixed z-10 inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105">
        <h4 className="text-xl font-semibold text-gray-800 text-center">
          Are You Sure You Want To Delete?
        </h4>
        <div className="flex items-center justify-center gap-6 pt-6">
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg shadow-md hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
          >
            Yes
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="px-6 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg shadow-md hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
import React, { useContext, useEffect, useState } from 'react';
import { Search, Pencil, SquarePen, Eye, Copy, Trash2, EllipsisVertical, X } from 'lucide-react';
import moment from 'moment';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import api from './api';
import { UserContext } from '../App';

function Notes() {
  const { setProgress } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setProgress(20);
      try {
        const response = await api.get('/api/v1/user/notes');
        setProgress(60);
        setNotes(response.data.data);
        setProgress(100);
      } catch (error) {
        setProgress(100);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const searchNote = notes.filter((note) =>
    note.topic.toLowerCase().includes(search.toLowerCase())
  );

  function handleCopy(description) {
    navigator.clipboard
      .writeText(description)
      .then(() => {
        setActiveId(null)
        toast.success('Copied successfully');
      })
      .catch((err) => {
        setActiveId(null)
        toast.error("Couldn't copy");
      });
  }

  function handleDelete(id) {
    setActiveId(null)
    setShowModal(true);
    setDeleteId(id);
  }

  return (
    <div className="min-h-[calc(100vh-66px)] bg-gradient-to-r from-blue-50 to-purple-50 py-6 md:py-10">
      <div className="md:w-[80%] w-[92%] m-auto max-w-[1000px]">
        <h2 className="md:text-3xl text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          All Notes
        </h2>
        <div className="relative py-3 md:my-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 w-full mb-3 placeholder:text-gray-500 placeholder:text-sm rounded-lg bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Search notes"
          />
          <Search
            size={20}
            color="#757575"
            className="absolute top-[40%] transform -translate-y-1/2 left-3"
            strokeWidth={1.25}
          />
        </div>

        <div className="space-y-4">
          {searchNote.length === 0 ? (
            <div className="text-lg text-gray-600">No notes available</div>
          ) : (
            searchNote
              .slice()
              .reverse()
              .map((note) => (
                <div
                  key={note._id}
                  className="group hover:bg-gray-50 transition-all duration-200 p-2 md:p-4 rounded-lg shadow-sm bg-white border border-gray-200"
                >
                  <div className="flex relative items-center justify-between">
                    <div className="flex items-center gap-x-2 md:gap-x-4">
                      <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-center">
                        <Pencil size={16} color="#4f46e5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h4 className="font-medium md:text-base text-sm text-gray-800">{note.topic}</h4>
                        <p className="md:text-xs text-[10px] text-gray-500">
                          {moment(note.updatedAt).fromNow()}
                        </p>
                      </div>
                    </div>

                    <div className="md:flex hidden gap-x-4">
                      <Link
                        state={notes}
                        to={`/?noteId=${note._id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <SquarePen
                          size={20}
                          className="text-gray-600 hover:text-blue-600"
                          strokeWidth={1.75}
                        />
                      </Link>
                      <Link
                        state={notes}
                        to={`/view/${note._id}`}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <Eye
                          size={20}
                          className="text-gray-600 hover:text-blue-600"
                          strokeWidth={1.75}
                        />
                      </Link>
                      <button
                        onClick={() => handleCopy(note.description)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <Copy
                          size={20}
                          className="text-gray-600 hover:text-blue-600"
                          strokeWidth={1.75}
                        />
                      </button>
                      <button
                        onClick={() => handleDelete(note._id)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                      >
                        <Trash2
                          size={20}
                          className="text-gray-600 hover:text-red-600"
                          strokeWidth={1.75}
                        />
                      </button>
                    </div>
                    <div onClick={() => setActiveId(note._id)} className='md:hidden mr-2'>
                      <EllipsisVertical />
                    </div>

                    {activeId === note._id && (
                      <div className='absolute z-20 bg-white border-[1px] border-gray-300 px-4 py-2 font-medium rounded-lg right-2'>
                      <ul className='space-y-3'>
                        <div className='w-full pt-1 flex justify-end'>
                          <X onClick={() => setActiveId(null)} size={16} className='text-right'/>
                        </div>
                        <li className='w-full'><Link state={notes} to={`/?noteId=${note._id}`} className='flex gap-x-4'><SquarePen size={20} className="text-gray-600 hover:text-blue-600" strokeWidth={1.75}/> Edit</Link></li>
                        <li className='w-full'><Link state={notes} to={`/view/${note._id}`} className='flex gap-x-4'><Eye size={20} className="text-gray-600 hover:text-blue-600" strokeWidth={1.75}/> View</Link></li>
                        <li className='w-full'><button onClick={() => handleCopy(note.description)} className='active:bg-white flex gap-x-4'><Copy size={20} className="text-gray-600 hover:text-blue-600" strokeWidth={1.75}/> Copy</button></li>
                        <li className='w-full'><button onClick={() => handleDelete(note._id)} className='active:bg-white flex gap-x-4'><Trash2 size={20} className="text-gray-600 hover:text-blue-600" strokeWidth={1.75}/> Delete</button></li>
                      </ul>
                    </div>
                    )}
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      {showModal && (
        <DeleteModal deleteId={deleteId} setNotes={setNotes} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default Notes;
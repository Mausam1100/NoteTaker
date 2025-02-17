import React, { useEffect, useState } from 'react'
import { Search, Pencil, SquarePen, Eye, Copy, Trash2 } from "lucide-react";
import moment from 'moment'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal';
import api from './api';

function Notes() {
    const [notes, setNotes] = useState([])
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [deleteId, setDeletId] = useState()

    useEffect(() => {
        const fetchData = async() => {
            try {
              const response = await api.get('/api/v1/user/notes')
              setNotes(response.data.data);
            } catch (error) {
              console.log(error);
            }
        }
        fetchData()
    }, [])
    
    const searchNote = notes.filter((note) => note.topic.toLowerCase().includes(search.toLowerCase()))

    function handleCopy(description) {
        navigator.clipboard.writeText(description)
        .then(() => {
            toast.success("Copied successfully")
        })
        .catch((err) => {
            toast.error("Couldn't copy")
        })
    }

    function handleDelete(id) {
        setShowModal(true)
        setDeletId(id)
    }
    
  return (
    <div>
        <div className='w-[80%] m-auto max-w-[1000px] pt-11'>
            <h2>All Notes</h2>
            <div className='relative my-6'>
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='pl-[40px] pr-4 py-2 w-full mb-3 placeholder:text-gray-500 placeholder:text-sm rounded-xl block bg-gray-200' placeholder='Search notes' />
                <Search size={20} color="#757575" className='absolute top-[50%] search left-3' strokeWidth={1.25} />
            </div>

            <div>
            {searchNote.length===0? <div className='text-lg'>No notes available</div>
            :searchNote.slice().reverse().map((note) => {
                    return (
                        <div key={note._id}>
                            <div className='hover:bg-gray-100 h-[70px] flex items-center justify-between py-3 px-3 rounded-xl'>
                                <div className='flex items-center h-full gap-x-3'>
                                    <div className='bg-gray-200 h-full flex items-center justify-center aspect-square rounded-lg'>
                                        <Pencil size={20} color="#0d0d0d" strokeWidth={1.75} />
                                    </div>
                                    <div>
                                        <h4>{note.topic}</h4>
                                        <p className='text-xs text-gray-500'>{moment(note.updatedAt).fromNow()}</p>
                                    </div>
                                </div>
        
                                <div className='flex gap-x-4'>
                                    <div className='noteIcon'><Link state={notes} to={`/?noteId=${note._id}`}><SquarePen size={20} className='-rotate-45' color='#787878' strokeWidth={1.75} /></Link></div>
                                    <div className='noteIcon'><Link state={notes} to={`/view/${note._id}`}><Eye size={20} className='-rotate-45' color='#787878' strokeWidth={1.75} /></Link></div>
                                    <div className='noteIcon cursor-pointer' onClick={() => handleCopy(note.description)}><Copy size={20} className='-rotate-45' color='#787878' strokeWidth={1.75} /></div>
                                    <div onClick={() => handleDelete(note._id)} className='noteIcon'><Trash2 size={20} className='-rotate-45' color='#787878' strokeWidth={1.75} /></div>
                                </div>
                            </div>
                            <hr className='text-gray-300'/>
                        </div>
                    )
                })}
            </div>
        </div>
        {showModal && <DeleteModal deleteId={deleteId} setNotes={setNotes} setShowModal={setShowModal} />}
    </div>
  )
}

export default Notes
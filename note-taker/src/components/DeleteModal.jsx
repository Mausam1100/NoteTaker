import React, { useContext } from 'react'
import api from './api'
import toast from 'react-hot-toast';
import { UserContext } from '../App';

function DeleteModal({setShowModal, deleteId, setNotes}) {
    const {setProgress} = useContext(UserContext)
    const handleDelete = async() => {
        setProgress(20)
        try {
            const response = await api.delete(`/api/v1/user/delete-note/${deleteId}`)
            setProgress(60)
            if(response.status === 200) {
                setNotes((prevNote) => {
                    return prevNote.filter((note) => note._id !== deleteId)
                })
                setProgress(100)
                toast.success(response.data.message)
                setShowModal(false)
            }
        } catch (error) {
            setProgress(100)
            toast.error(error.response.data.error.message)
        }
    }

  return (
    <div>
        <div className='fixed z-10 inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center'>
            <div className='bg-white px-10 py-14 rounded-2xl'>
                <h4>Are You Sure You Want To Delete ?</h4>
                <div className='flex items-center justify-evenly pt-5'>
                    <button onClick={handleDelete} className='button cursor-pointer h-10 px-[40px]'>Yes</button>
                    <button onClick={() => setShowModal(false)} className='button cursor-pointer h-10 px-[40px]'>No</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal
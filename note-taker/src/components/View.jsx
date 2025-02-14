import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Copy } from "lucide-react";
import toast from 'react-hot-toast';

function View() {
    const {id} = useParams()
    const location = useLocation()
    const allNote = location.state
    const note = allNote.find((note) => note._id === id)

    function handleCopy(description) {
        navigator.clipboard.writeText(description)
        .then(() => {
            toast.success("Copied successfully")
        })
        .catch((err) => {
            toast.error("Couldn't copy")
        })
    }
    
  return (
    <div>
        <div className='w-[80%] m-auto max-w-[1000px]'>
            <div>
                <h1 className='pt-10 pb-5'></h1>
                <form>
                    <label htmlFor="topic">
                        <div className='pb-2'>Topic:</div>
                        <div className='flex items-center justify-between h-[50px] mb-3'>
                            <input type="text" value={note.topic} name='topic' className='text-gray-500 px-4 py-2 w-[90%] h-full border-[1px] placeholder:text-gray-800 rounded-xl border-gray-400'disabled />
                            <div onClick={() => handleCopy(note.description)} className='button hover:bg-[#6164fa] cursor-pointer px-4 py-3 rounded-lg'><Copy size={20} color='white' strokeWidth={1.75} /></div>
                        </div>
                    </label>
                    
                    <label htmlFor="description">
                        <div className='pb-2 mt-5'>Description:</div>
                        <textarea name="description" value={note.description} className='text-gray-500 focus:outline-none px-4 py-3 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' rows={13} disabled></textarea>
                    </label>
                </form>
            </div>
        </div>
    </div>
  )
}

export default View
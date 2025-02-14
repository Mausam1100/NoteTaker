import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useLocation, useSearchParams } from 'react-router-dom';

function Home() {
    const [searchParams, setSearchParams] = useSearchParams()
    const editId = searchParams.get("noteId")
    const location = useLocation()
    const notes = location.state

    const [formData, setFormData] = useState({
        topic: "",
        description: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = editId
                ? await axios.put(`https://notetaker-server.vercel.app/api/v1/user/save-note/${editId}`, formData)
                : await axios.post('https://notetaker-server.vercel.app/api/v1/user/save-note', formData)
            toast.success(response.data.message)
            setFormData({
                topic: "",
                description: ""
            })
        } catch (error) {
            toast.error(error.response.data.error.message)
            console.log(error);
        }
    }

    useEffect(() => {
        if(editId) {
            const editNote = notes.find((note) => note._id === editId)
            setFormData({
                topic: editNote.topic,
                description: editNote.description
            })
        }
    }, [editId])
    

  return (
    <div>
        <div className='w-[80%] m-auto max-w-[1000px]'>
            <div>
                <h1 className='pt-10 pb-5'>Create New Note</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="topic">
                        <div className='pb-2'>Topic:</div>
                        <div className='flex items-center justify-between h-[50px] mb-3'>
                            <input type="text" placeholder="What's the topic?" name='topic' value={formData.topic} onChange={handleChange} className='px-4 py-2 w-[calc(100%-180px)] h-full border-[1px] placeholder:text-gray-800 rounded-xl border-gray-400' id='topic' required />
                            <button type='submit' className='cursor-pointer button h-full px-14'>{editId? 'Update': 'Save'}</button>
                        </div>
                    </label>
                    
                    <label htmlFor="description">
                        <div className='pb-2 mt-5'>Description:</div>
                        <textarea name="description" placeholder="What's the note?" value={formData.description} onChange={handleChange} id="description" className='focus:outline-none px-4 py-3 w-full border-[1px] mb-3 placeholder:text-gray-800 rounded-xl block border-gray-400' rows={13}></textarea>
                    </label>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Home
const asyncHandler = require('../utils/asyncHandler')
const ApiError = require('../utils/apiError')
const ApiResponse = require('../utils/apiResponse')
const Note = require('../model/note.model')
const { default: mongoose } = require("mongoose")

const saveNote = asyncHandler(async (req, res) => {
    const {topic, description} = req.body
    const userId = req.user._id
    
    if(!topic) {
        return ApiError(res, "Topic is missing", 400)
    }

    const sameTopic = await Note.findOne({topic, userId})
    if (sameTopic) {
        return ApiError(res, "Same topic already existed", 400)
    }

    const note = await Note.create({
        topic,
        description,
        userId: userId
    })

    if(!note) {
        return ApiError(res, "Something went wrong when saving note")
    }

    res.status(200)
    .json(new ApiResponse(
        200,
        note,
        "Note saved successfully"
    ))
})

const getNotes = asyncHandler(async (req, res) => {
    if (!req.user || !req.user._id) {
        return ApiError(res, "User not authenticated", 401);
    }
    
    try {
        const user = await Note.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "noteDetails"
                }
            },
            {
                $addFields: {
                    noteDetails: {
                        $first: "$noteDetails"
                    }
                }
            },
            {
                $project: {
                    topic: 1,
                    description: 1,
                    userId: 1,
                    noteDetails: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ])
        res.status(200)
        .json(new ApiResponse(
            200, 
            user,
            "Notes fetched successfully"
        ))
    } catch (error) {
        console.log(error);
        return ApiError(res, "Unable to fetch notes", 400)
    }
})

const deleteNote = asyncHandler(async (req, res) => {
    try {
        const {id} = req.params
    
        const note = await Note.findByIdAndDelete(id)
        if(!note) {
            return ApiError(res, "Note not found", 400)
        }
    
        res.status(200)
        .json(new ApiResponse(
            200,
            {},
            "Note deleted successfully"
        ))
    } catch (error) {
        return ApiError(res, "Couldn't delet note", 400)
    }
})

const editNote = asyncHandler(async (req, res) => {
    try {
        const {topic, description} = req.body
        const {id} = req.params
    
        const note = await Note.findById(id)
    
        if(!note) {
            return ApiError(res, "Note not found", 400)
        }
    
        note.topic = topic
        note.description = description 
    
        await note.save()
    
        res.status(200)
        .json(new ApiResponse(
            200,
            note,
            "Note Updated Successfully"
        ))
    } catch (error) {
        console.log(error);
        return ApiError(res, "Couldn't Update Note", 400)
    }
})

module.exports = {getNotes, saveNote, deleteNote, editNote}
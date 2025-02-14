const {
    Schema,
    model,
    default: mongoose
} = require("mongoose");
  
const noteSchema = new Schema({
    topic: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

const Note = model("Note", noteSchema)
  
module.exports = Note
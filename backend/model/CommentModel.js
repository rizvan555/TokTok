import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    content: { type: String },

});

export const Comment = mongoose.model("Comment", commentSchema);
import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    content: { type: String },
    post: { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
    createdAt: new Date(),

});

export const Comment = mongoose.model("Comment", commentSchema);
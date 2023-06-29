import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    content: { type: String },
    img: { type: String },
    comments: { type: mongoose.SchemaTypes.ObjectId, ref: "Comment" },
    location: { type: String },
});

export const Post = mongoose.model("Post", postSchema);
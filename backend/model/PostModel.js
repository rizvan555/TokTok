import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({ comment: String });

const postSchema = new mongoose.Schema({
    content: String,
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    image: {},
    comment: [commentSchema],
});

export const Post = mongoose.model("Post", postSchema);
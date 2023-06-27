import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: String,
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    hashtags: [String],
});

export const Post = mongoose.model("Post", postSchema);
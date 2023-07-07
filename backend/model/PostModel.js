import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    content: { type: String },
    image: { type: String },
    comments: { type: mongoose.SchemaTypes.ObjectId, ref: "Comment" },
    location: { type: String },
    facebook: { type: Boolean },
    twitter: { type: Boolean },
    tumblr: { type: Boolean },
    commentCount: { type: Number, default: 0 },
    likes: { type: Array, default: [] },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Post = mongoose.model("Post", postSchema);
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
    likeCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    isLiked: { type: Boolean, default: false }
});

export const Post = mongoose.model("Post", postSchema);
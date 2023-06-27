import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    posts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Post" }, { type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
});



export const User = mongoose.model("User", userSchema);
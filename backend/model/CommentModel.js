import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  content: { type: String },
  post: { type: mongoose.SchemaTypes.ObjectId, ref: "Post" },
  likeCount: { type: Number, default: 0 },
  // createdAt: new Date(),
  feedback: { type: mongoose.SchemaTypes.ObjectId, ref: "Feedback" },
   

});

const feedbackSchema = new mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
  content: { type: String },
});

export const feedback = mongoose.model("Feeback", feedbackSchema);

export const Comment = mongoose.model("Comment", commentSchema);

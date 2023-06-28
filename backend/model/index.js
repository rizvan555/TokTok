import dotenv from "dotenv";
import mongoose from "mongoose";
export default mongoose;

export { User } from "./UserModel.js";
export { Post } from "./PostModel.js";
export { Comment } from "./CommentModel.js";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

mongoose.connect(process.env.DB);
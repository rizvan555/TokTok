import mongoose from "mongoose";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
process.env.TOKEN_SECRET;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    salt: { type: String, required: true, select: false },
    hash: { type: String, required: true, select: false },
    posts: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Post" }, { type: mongoose.SchemaTypes.ObjectId, ref: "Comment" }],
});


userSchema.methods.setPassword = function (password) {

    this.salt = crypto.randomBytes(64).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");
};

userSchema.methods.verifyPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
        .toString("hex");

    return this.hash === hash;
};

userSchema.methods.generateAuthToken = function () {
    const payload = { name: this.name, email: this.email };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    return token;
};


export const User = mongoose.model("User", userSchema);
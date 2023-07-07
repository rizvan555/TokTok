import express from "express";
import dotenv from "dotenv";
import { Post, User, Comment } from "./model/index.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import Multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import mongoose, { ObjectId } from "mongoose";
import cors from "cors";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    transformation: [{ width: 350, height: 350, crop: "limit" }],
  });
  return res;
}

const storage = new Multer.memoryStorage();
const upload = Multer({
  storage,
});

const PORT = process.env.BE_PORT || 4000;
const app = express();

// const ReactAppDistPath = new URL("../dist/", import.meta.url);
// const ReactAppIndex = new URL("../dist/index.html", import.meta.url);

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// app.use(express.static(ReactAppDistPath.pathname));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/api/status", (req, res) => {
  res.send({ status: "Tutto bene! :)" });
});

// ========== SIGN UP ==========
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Überprüft, ob User existiert
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect("/signin");
    }
    // Erstelle einen neuen Benutzer
    const newUser = new User({ email });
    newUser.setPassword(password);

    // Speichert User in DB
    await newUser.save();

    res.status(201).json({ message: "Benutzer erfolgreich erstellt" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Benutzer konnte nicht erstellt werden" });
  }
});

// ========== SIGN IN ==========
app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Überprüft, ob User existiert
    const user = await User.findOne({ email }).select("+hash").select("+salt");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Ungültige E-mail oder Passwort" });
    }
    console.log(user);

    // Überprüft PW
    const isPasswordValid = user.verifyPassword(password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Ungültige E-mail oder Passwort" });
    }

    const token = user.generateAuthToken({ email });
    res.cookie("auth", token, { httpOnly: true, maxAge: 1000 * 60 * 120 }); // Cookie
    return res
      .status(200)
      .json({ message: "Login erfolgreich", data: { token } });
  } catch (error) {
    res.status(500).json({ message: "Login fehlgeschlagen", error });
    console.log(error);
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  let token = authHeader && authHeader.split(" ")[1]; // Extrahiere den Token aus dem Authorization Header

  if (!token && req?.cookies?.auth) {
    token = req.cookies.auth;
  }

  if (!token) {
    return res.sendStatus(401); // Token nicht vorhanden
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Token ungültig oder abgelaufen
    }

    req.user = user; // Speichere den Benutzer aus dem Token im Request-Objekt
    next(); // Rufe die nächste Middleware oder den Controller auf
  });
};

// ========== VERIFY ==========
app.get("/api/secure", authenticateToken, (req, res) => {
  res.json(req.user);
});

// ========== LOGOUT ==========
app.get("/api/logout", async (req, res) => {
  res.clearCookie("auth");
  res.send("Ok");
});

// ========== GET LOGED IN USER  ==========
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

// ========== POST/EDIT NEW PROFILE IMAGE ==========
app.post(
  "/api/upload/avatar",
  authenticateToken,
  upload.single("avatar"),
  async (req, res) => {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
      const cldRes = await handleUpload(dataURI);
      res.json(cldRes);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }
);

// ========== UPDATE USER ==========
app.put("/api/user", authenticateToken, async (req, res) => {
  const {
    avatar,
    name,
    username,
    activity,
    email,
    birthday,
    gender,
    tel,
    website,
    aboutMe,
  } = req.body;

  try {
    console.log(req.user);

    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $set: req.body }
    );
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // user.avatar = avatar;
    // user.name = name;
    // user.username = username;
    // user.email = email;
    // user.activity = activity;
    // user.birthday = birthday;
    // user.gender = gender || null;
    // user.tel = tel;
    // user.website = website;
    // user.aboutMe = aboutMe;

    // await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error editing." });
  }
});

// ========== GET ALL POSTS FROM ONE USER ==========

app.get("/api/user/posts", async (req, res) => {
  const { userid } = req.params;

  try {
    const posts = await Post.find({ user: userid });
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ========== GET ALL POSTS FROM ALL USERS ==========

app.get("/api/posts", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find().populate("user").populate({
      path: "comments",
      model: "Comment",
      populate: {
        path: "user",
        model: "User"
      }
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No posts found." });
  }
});

// ========== GET ONE POST with Post _id ==========
app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch post." });
  }
});

// ========== FIND ALL USERS ==========
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "No users found." });
  }
});

// ========== UPLOAD NEW IMAGE FILE ==========
app.post(
  "/api/upload/image",
  authenticateToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const b64 = Buffer.from(req.file.buffer).toString("base64");
      let dataURI = "data:" + req.file.mimetype + ";base64," + b64;

      const cldRes = await handleUpload(dataURI);
      res.json(cldRes);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  }
);

// ========== POST NEW POST with/from user _id ==========

app.post("/api/newpost", authenticateToken,
  async (req, res) => {
    try {
      const { content, location, image, facebook, twitter, tumblr, likeCount, commentCount, isLiked, user, createdAt } = req.body;
      console.log(req.body);
      const newPost = new Post({
        content,
        location,
        user: new mongoose.Types.ObjectId(user),
        image,
        facebook,
        twitter,
        tumblr,
        likeCount,
        commentCount,
        isLiked,
        createdAt
      });

      const savedPost = await newPost.save();

      res.status(201).json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create post." });
    }
  });

// LIKES
// ========== LIKE A POST AND UPDATE LIKES ==========

app.put('/api/posts/updateLike', authenticateToken, async (req, res) => {
  const { postId } = req.body;

  try {
    const isLiked = await Post.find({ likes: { $in: [req.user.id] } })
    if (isLiked.length > 0) {
      const updatedPost = await Post.findByIdAndUpdate(postId, { $pullAll: { likes: [req.user.id] } })
      res.json(updatedPost)
    } else {
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { $push: { likes: req.user.id } },
        { new: true }
      );
      res.json(updatedPost);
    }
    console.log(isLiked);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Fehler beim Aktualisieren der Daten.' });
  }
});

// COMMENTS

// ========== GET ALL COMMENTS FOR ONE POST ==========
app.get("/api/comments", async (req, res) => {
  try {
    const comments = await Comment.find().populate("feedback");
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch comments." });
  }
});

// ========== GET SINGLE COMMENT ==========
app.get("/api/comment/:id");

// ========== PUT NEW COMMENT TO A POST ==========
app.put("/api/comments/:postid", authenticateToken, async (req, res) => {
  try {
    const { content, likeCount } = req.body;
    const { postid } = req.params;

    const newComment = new Comment({
      user: req.body.user,
      content,
      post: postid,
      likeCount,
    });


    const savedComment = await newComment.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create comment." });
  }
});

// ==================================================

app.get("/*", (req, res) => {
  // res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
  console.log("Server läuft auf Port: ", PORT);
});

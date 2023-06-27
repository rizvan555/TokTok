import express from "express";
import dotenv from "dotenv";
import { Post, User, Comment } from "./model/index.js"


dotenv.config({ path: new URL("../.env", import.meta.url).pathname });


const PORT = process.env.BE_PORT || 3000;
const app = express();

// const ReactAppDistPath = new URL("../dist/", import.meta.url);
// const ReactAppIndex = new URL("../dist/index.html", import.meta.url);

app.use(express.json());
// app.use(express.static(ReactAppDistPath.pathname));


app.get("/api/status", (req, res) => {
    res.send({ status: "Tutto bene! :)" });
});


// ========== GET ALL POSTS ==========

// app.get("/api/feed", async (req, res) => {
//     try {
//         const posts = await Post.find();
//         res.send(posts)

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "No posts found." })

//     }

// })



app.post("/api/user", async (req, res) => {
    try {
        // Mongoose Validiert
        const newContact = await User.create(req.body);
        res.send({ newEntry: newUser, errors: null });
    } catch (error) {
        // Wenn es fehler gibt senden wir diese ans Front-End
        res.send({ newEntry: null, errors: error.errors });
    }
});

// ========== POST NEW POST ==========
app.post("/api/newpost", async (req, res) => {
    try {
        const { content, user, hashtags } = req.body;

        const newPost = new Post({
            content,
            user,
            hashtags,
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create post." });
    }
});



// ========== POST NEW COMMENT ==========

app.post("/api/newcomment", async (req, res) => {
    try {
        const { user, comment } = req.body;

        const newComment = new Comment({
            user,
            comment,
        });

        const savedComment = await newComment.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create comment." });
    }
});



// app.get("/*", (req, res) => {
//     // res.sendFile(ReactAppIndex.pathname);
// });

app.listen(PORT, () => {
    console.log("Server läuft auf Port: ", PORT);
});

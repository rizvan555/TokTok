import express from "express";
import dotenv from "dotenv";
import { Post, User, Comment } from "./model/index.js"
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";



dotenv.config({ path: new URL("../.env", import.meta.url).pathname });


const PORT = process.env.BE_PORT || 3000;
const app = express();

// const ReactAppDistPath = new URL("../dist/", import.meta.url);
// const ReactAppIndex = new URL("../dist/index.html", import.meta.url);

app.use(express.json());
app.use(cookieParser());
// app.use(express.static(ReactAppDistPath.pathname));


app.get("/api/status", (req, res) => {
    res.send({ status: "Tutto bene! :)" });
});



// ========== SIGN UP ==========

app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Überprüft, ob User existiert
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Bei bestehender E-Mail Adresse direkte Weiterleitung an "Login Components":
            return res.redirect("/signin");
        }


        // Erstelle einen neuen Benutzer
        const newUser = new User({ name, email });
        newUser.setPassword(password);

        // Speichert User in DB
        await newUser.save();

        res.status(201).json({ message: "Benutzer erfolgreich erstellt" });
    } catch (error) {
        res.status(500).json({ message: "Benutzer konnte nicht erstellt werden" });
    }
});



// ========== SIGN IN ==========


// app.post("/api/signin", async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Überprüft, ob User existiert
//         const user = await UserModel.findOne({ email });
//         if (!user) {
//             return res.status(401).json({ message: "Ungültige E-mail oder Passwort" });
//         }

//         // Überprüft PW
//         const isPasswordValid = user.verifyPassword(password);
//         if (!isPasswordValid) {
//             return res.status(401).json({ message: "Ungültige E-mail oder Passwort" });
//         }

//         const token = user.generateAuthToken({ email });
//         res.cookie("auth", token, { httpOnly: true, maxAge: 1000 * 60 * 30 }); // Cookie
//         return res.status(200).json({ message: "Login erfolgreich", data: { token } });

//     } catch (error) {
//         res.status(500).json({ message: "Login fehlgeschlagen" });
//     }
// });


// const authenticateToken = (req, res, next) => {
//     const authHeader = req.headers["authorization"];
//     let token = authHeader && authHeader.split(" ")[1]; // Extrahiere den Token aus dem Authorization Header

//     if (!token && req?.cookies?.auth) {
//         token = req.cookies.auth;
//     }

//     if (!token) {
//         return res.sendStatus(401); // Token nicht vorhanden
//     }

//     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//         if (err) {
//             return res.sendStatus(403); // Token ungültig oder abgelaufen
//         }

//         req.user = user; // Speichere den Benutzer aus dem Token im Request-Objekt
//         next(); // Rufe die nächste Middleware oder den Controller auf
//     });
// };

// // app.get("/api/secure", authenticateToken, (req, res) => {
// //     res.json(req.user);
// // });



// ========== GET ALL POSTS ==========

app.get("/api/feed", async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No posts found." })

    }

})



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



app.get("/*", (req, res) => {
    // res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
    console.log("Server läuft auf Port: ", PORT);
});

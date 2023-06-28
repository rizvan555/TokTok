import express from "express";
import dotenv from "dotenv";
import { Post, User } from "./model/index.js"
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";



dotenv.config({ path: new URL("../.env", import.meta.url).pathname });


const PORT = process.env.BE_PORT || 4000;
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
            return res.status(401).json({ message: "Ungültige E-mail oder Passwort" });
        }
        console.log(user);

        // Überprüft PW
        const isPasswordValid = user.verifyPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Ungültige E-mail oder Passwort" });
        }

        const token = user.generateAuthToken({ email });
        res.cookie("auth", token, { httpOnly: true, maxAge: 1000 * 60 * 30 }); // Cookie
        return res.status(200).json({ message: "Login erfolgreich", data: { token } });

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

app.get("/api/secure", authenticateToken, (req, res) => {
    res.json(req.user);
});




// ========== GET USER PROFIL ==========


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




// ========== UPDATE USER PROFIL ==========

app.put("/api/user", authenticateToken, async (req, res) => {

    const { name, username, email, birthday, tel, sex, website, aboutMe } = req.body;

    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        user.name = name;
        user.username = username;
        user.email = email
        user.birthday = birthday;
        user.tel = tel;
        user.sex = sex;
        user.website = website;
        user.aboutMe = aboutMe;

        await user.save();
        res.json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error editing." });
    }
});



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


// ========== FIND ALL USERS ==========

app.get("/api/users", async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No users found." })
    }
});


// // ========== POST NEW POST ==========
// app.post("/api/newpost", async (req, res) => {
//     try {
//         const { content, user, hashtags } = req.body;

//         const newPost = new Post({
//             content,
//             user,
//             hashtags,
//         });

//         const savedPost = await newPost.save();

//         res.status(201).json(savedPost);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to create post." });
//     }
// });



// // ========== POST NEW COMMENT ==========

// app.post("/api/newcomment", async (req, res) => {
//     try {
//         const { user, comment } = req.body;

//         const newComment = new Comment({
//             user,
//             comment,
//         });

//         const savedComment = await newComment.save();

//         res.status(201).json(savedPost);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to create comment." });
//     }
// });



app.get("/*", (req, res) => {
    // res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
    console.log("Server läuft auf Port: ", PORT);
});

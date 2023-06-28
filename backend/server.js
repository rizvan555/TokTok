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



// ========== UPDATE USER ==========

app.put("/api/user", authenticateToken, async (req, res) => {

    const { name, username, email, birthday, gender, tel, sex, website, aboutMe } = req.body;

    try {
        const user = await User.findOne({ email: req.user.email });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        user.name = name;
        user.username = username;
        user.email = email
        user.birthday = birthday;
        user.gender = gender;
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


// ========== GET ALL POSTS FROM ONE USER ==========

// app.get("/api/:user/posts", async (req, res) => {
//     const { userid } = req.params;

//     try {
//         const posts = await Post.find({ user: userid });
//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });


// ========== GET ALL POSTS FROM ALL USERS ==========

app.get("/api/posts", async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts).json(posts)

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "No posts found." })

    }

})


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
        res.status(500).json({ error: "No users found." })
    }
});


// ========== POST NEW POST from user _id ==========
app.post("/api/:user/newpost", async (req, res) => {
    try {
        const { content, location } = req.body;
        const userId = req.params.user;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const newPost = new Post({
            content,
            location,
            user: user._id,
        });

        const savedPost = await newPost.save();

        res.status(201).json(savedPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create post." });
    }
});




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

import mongoose from "mongoose";
import { User } from "../model/UserModel.js";
import "dotenv/config.js";

await mongoose.connect(process.env.DB);


const user = new User();
user.name = "Billy Smith";
user.email = "billy@smithysmith.com";
await user.save();

const user2 = new User({
    name: "Sahra Parker",
    email: "parker@park.park",
});

await user2.save();

await User.create({
    name: "Jessica Smith",
    email: "jessica@smithysmith.com",
});


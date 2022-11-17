import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import joi from "joi";

import {
    postSignIn,
    postSignOut,
    postSignUp
} from "./controllers/userController.js";


// schemas
export const userSchema = joi.object(
    {
        name: joi.string().min(2).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).required()
    }
);


// instance of express
const app = express();


// configs
app.use(cors());
app.use(express.json());
dotenv.config();


// database connection
const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB connected");
} catch (err) {
    console.log(err);
}

const db = mongoClient.db(process.env.MONGO_DB);
export const sessionsCollection = db.collection("sessions");
export const usersCollection = db.collection("users");

// sign routes
app.post("/sign-in", postSignIn);

app.post("/sign-out", postSignOut);

app.post("/sign-up", postSignUp);


// starts the server
app.listen(process.env.SERVER_PORT, () => console.log(`Server running in port: ${process.env.SERVER_PORT}`));

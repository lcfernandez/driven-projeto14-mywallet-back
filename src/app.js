import { MongoClient } from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";


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


// starts the server
app.listen(process.env.SERVER_PORT, () => console.log(`Server running in port: ${process.env.SERVER_PORT}`));
